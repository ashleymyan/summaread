"use client"

import { useState } from "react"
import { Moon, Sun, Volume2, VolumeX, Eye, EyeOff } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useTheme } from "@/components/dark-mode-provider"

interface SettingsModalProps {
  onClose: () => void
}

export function SettingsModal({ onClose }: SettingsModalProps) {
  const { theme, toggleTheme } = useTheme()
  const [textSize, setTextSize] = useState(16)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [highContrast, setHighContrast] = useState(false)

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-center text-[hsl(var(--primary))] font-serif text-xl">Settings</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {theme === "dark" ? (
                <Moon className="h-5 w-5 text-[hsl(var(--primary))]" />
              ) : (
                <Sun className="h-5 w-5 text-[hsl(var(--primary))]" />
              )}
              <Label htmlFor="dark-mode" className="text-[hsl(var(--primary))] font-medium">
                Dark Mode
              </Label>
            </div>
            <Switch
              id="dark-mode"
              checked={theme === "dark"}
              onCheckedChange={toggleTheme}
              className="data-[state=checked]:bg-[hsl(var(--primary))]"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="text-size" className="text-[hsl(var(--primary))] font-medium">
              Text Size
            </Label>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-[hsl(var(--muted-foreground))]">A</span>
              <Slider
                id="text-size"
                min={12}
                max={24}
                step={1}
                value={[textSize]}
                onValueChange={(value) => setTextSize(value[0])}
                className="flex-1"
              />
              <span className="text-lg text-[hsl(var(--muted-foreground))] font-medium">A</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {soundEnabled ? (
                <Volume2 className="h-5 w-5 text-[hsl(var(--primary))]" />
              ) : (
                <VolumeX className="h-5 w-5 text-[hsl(var(--primary))]" />
              )}
              <Label htmlFor="sound" className="text-[hsl(var(--primary))] font-medium">
                Page Turn Sound
              </Label>
            </div>
            <Switch
              id="sound"
              checked={soundEnabled}
              onCheckedChange={setSoundEnabled}
              className="data-[state=checked]:bg-[hsl(var(--primary))]"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {highContrast ? (
                <Eye className="h-5 w-5 text-[hsl(var(--primary))]" />
              ) : (
                <EyeOff className="h-5 w-5 text-[hsl(var(--primary))]" />
              )}
              <Label htmlFor="contrast" className="text-[hsl(var(--primary))] font-medium">
                High Contrast
              </Label>
            </div>
            <Switch
              id="contrast"
              checked={highContrast}
              onCheckedChange={setHighContrast}
              className="data-[state=checked]:bg-[hsl(var(--primary))]"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

