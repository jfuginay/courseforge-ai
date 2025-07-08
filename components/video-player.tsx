"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, SkipBack, SkipForward } from "lucide-react"

interface VideoPlayerProps {
  videoId: string
  currentTime: number
  duration: number
  isPlaying: boolean
  onTimeUpdate: (time: number) => void
  onPlayPause: () => void
  onSeek: (time: number) => void
  className?: string
}

export function VideoPlayer({
  videoId,
  currentTime,
  duration,
  isPlaying,
  onTimeUpdate,
  onPlayPause,
  onSeek,
  className = "",
}: VideoPlayerProps) {
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const playerRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout>()

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false)
      }
    }, 3000)
  }

  const handleSkip = (seconds: number) => {
    const newTime = Math.max(0, Math.min(duration, currentTime + seconds))
    onSeek(newTime)
  }

  const handleVolumeChange = (newVolume: number[]) => {
    const vol = newVolume[0]
    setVolume(vol)
    setIsMuted(vol === 0)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleFullscreen = () => {
    if (playerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        playerRef.current.requestFullscreen()
      }
    }
  }

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={playerRef}
      className={`relative bg-black rounded-lg overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Video Content - In a real implementation, this would be a YouTube iframe or video element */}
      <div className="aspect-video flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
            {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
          </div>
          <p className="text-lg opacity-75">YouTube Video Player</p>
          <p className="text-sm opacity-50">Video ID: {videoId}</p>
        </div>
      </div>

      {/* Controls Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Play/Pause Button (Center) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            size="lg"
            variant="ghost"
            className="w-16 h-16 rounded-full bg-black/50 text-white hover:bg-black/70 hover:text-white"
            onClick={onPlayPause}
          >
            {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
          </Button>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
          {/* Progress Bar */}
          <div className="flex items-center gap-2 text-white text-sm">
            <span>{formatTime(currentTime)}</span>
            <div className="flex-1">
              <Slider
                value={[currentTime]}
                max={duration}
                step={1}
                onValueChange={(value) => onSeek(value[0])}
                className="cursor-pointer"
              />
            </div>
            <span>{formatTime(duration)}</span>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20 hover:text-white"
                onClick={onPlayPause}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>

              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20 hover:text-white"
                onClick={() => handleSkip(-10)}
              >
                <SkipBack className="w-4 h-4" />
              </Button>

              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20 hover:text-white"
                onClick={() => handleSkip(10)}
              >
                <SkipForward className="w-4 h-4" />
              </Button>

              {/* Volume Control */}
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20 hover:text-white"
                  onClick={toggleMute}
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
                <div className="w-20">
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    max={1}
                    step={0.1}
                    onValueChange={handleVolumeChange}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 hover:text-white">
                <Settings className="w-4 h-4" />
              </Button>

              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20 hover:text-white"
                onClick={handleFullscreen}
              >
                <Maximize className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
