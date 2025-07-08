#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Simple task management implementation
const TASKS_FILE = path.join(__dirname, 'tasks.json');

class TaskMaster {
  constructor() {
    this.tasks = this.loadTasks();
  }

  loadTasks() {
    try {
      return JSON.parse(fs.readFileSync(TASKS_FILE, 'utf8'));
    } catch (e) {
      return [];
    }
  }

  saveTasks() {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(this.tasks, null, 2));
  }

  addTask(description) {
    const task = {
      id: Date.now().toString(),
      title: description,
      priority: this.detectPriority(description),
      category: this.detectCategory(description),
      completed: false,
      createdAt: new Date().toISOString()
    };
    this.tasks.push(task);
    this.saveTasks();
    return task;
  }

  detectPriority(description) {
    const desc = description.toLowerCase();
    if (desc.includes('critical') || desc.includes('urgent') || desc.includes('mvp')) return 'critical';
    if (desc.includes('high') || desc.includes('important')) return 'high';
    if (desc.includes('low') || desc.includes('minor')) return 'low';
    return 'medium';
  }

  detectCategory(description) {
    const desc = description.toLowerCase();
    if (desc.includes('ci') || desc.includes('cd') || desc.includes('pipeline')) return 'ci-cd';
    if (desc.includes('ios') || desc.includes('swift')) return 'ios';
    if (desc.includes('android')) return 'android';
    if (desc.includes('api') || desc.includes('marketplace')) return 'api-integration';
    if (desc.includes('backend') || desc.includes('firebase')) return 'backend';
    return 'general';
  }

  listTasks() {
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    return this.tasks.sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }

  completeTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = true;
      task.completedAt = new Date().toISOString();
      this.saveTasks();
    }
    return task;
  }
}

// CLI
const taskMaster = new TaskMaster();
const command = process.argv[2];
const args = process.argv.slice(3).join(' ');

switch(command) {
  case 'add':
    const task = taskMaster.addTask(args);
    console.log(`✅ Added task #${task.id}: ${task.title}`);
    console.log(`   Priority: ${task.priority}, Category: ${task.category}`);
    break;
    
  case 'list':
    const tasks = taskMaster.listTasks();
    console.log('\n📋 ListPro/Katalyst AI Task Board\n');
    
    const incomplete = tasks.filter(t => !t.completed);
    const complete = tasks.filter(t => t.completed);
    
    if (incomplete.length > 0) {
      console.log('🔥 Active Tasks:');
      incomplete.forEach(task => {
        const emoji = task.priority === 'critical' ? '🚨' : 
                     task.priority === 'high' ? '⚡' : 
                     task.priority === 'medium' ? '📌' : '📎';
        console.log(`${emoji} [${task.priority.toUpperCase()}] #${task.id}: ${task.title}`);
        console.log(`   Category: ${task.category}`);
      });
    }
    
    if (complete.length > 0) {
      console.log('\n✓ Completed:');
      complete.forEach(task => {
        console.log(`✅ #${task.id}: ${task.title}`);
      });
    }
    break;
    
  case 'complete':
    const completed = taskMaster.completeTask(args);
    if (completed) {
      console.log(`✅ Completed task #${completed.id}: ${completed.title}`);
    } else {
      console.log(`❌ Task #${args} not found`);
    }
    break;
    
  default:
    console.log(`
🚀 Task Master for ListPro/Katalyst AI

Usage:
  npm run task:add "Task description"    - Add a new task
  npm run task:list                      - List all tasks by priority
  npm run task:complete <id>             - Mark task as complete

Auto-detects:
  - Priority: critical, high, medium, low
  - Categories: ci-cd, ios, android, api-integration, backend
    `);
}