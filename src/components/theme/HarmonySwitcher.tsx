import { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const HARMONIES = [
  { value: 'analogous', label: 'Analogous' },
  { value: 'monochromatic', label: 'Monochromatic' },
  { value: 'complementary', label: 'Complementary' },
  { value: 'triadic', label: 'Triadic' },
  { value: 'split-complementary', label: 'Split-Complementary' },
  { value: 'tetradic', label: 'Tetradic' },
] as const

type Harmony = (typeof HARMONIES)[number]['value']

const STORAGE_KEY = 'theme-harmony'

export function HarmonySwitcher() {
  const [harmony, setHarmony] = useState<Harmony>('analogous')

  // Read saved preference on mount (client-only — avoids SSR mismatch)
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Harmony | null
    if (saved) {
      setHarmony(saved)
      document.documentElement.setAttribute('data-harmony', saved)
    }
  }, [])

  function handleChange(value: Harmony) {
    setHarmony(value)
    document.documentElement.setAttribute('data-harmony', value)
    localStorage.setItem(STORAGE_KEY, value)
  }

  return (
    <Select value={harmony} onValueChange={handleChange}>
      <SelectTrigger className="w-45" aria-label="Color harmony">
        <SelectValue placeholder="Select harmony" />
      </SelectTrigger>
      <SelectContent>
        {HARMONIES.map((h) => (
          <SelectItem key={h.value} value={h.value}>
            {h.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
