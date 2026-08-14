import { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const HARMONIES = [
  { value: 'monochromatic', label: 'Monochromatic' },
  { value: 'complementary', label: 'Complementary' },
  // { value: 'analogous', label: 'Analogous' }, // Looks identical to Monochromatic in most cases
  { value: 'triadic', label: 'Triadic' },
  // { value: 'split-complementary', label: 'Split-Complementary' }, // Overcomplicates the output
  { value: 'tetradic', label: 'Tetradic' },
] as const

type Harmony = (typeof HARMONIES)[number]['value']

// Curated seed colors — feel free to tweak these OKLCH values
const BASE_COLORS = [
  { value: 'oklch(0.74 0.11 192)', label: 'Lagoon Teal' },
  { value: 'oklch(0.72 0.14 25)', label: 'Coral' },
  { value: 'oklch(0.70 0.15 300)', label: 'Violet' },
  { value: 'oklch(0.75 0.13 145)', label: 'Meadow Green' },
  { value: 'oklch(0.78 0.14 85)', label: 'Amber' },
  { value: 'oklch(0.65 0.16 265)', label: 'Indigo' },
  { value: 'oklch(0.72 0.12 350)', label: 'Rose' },
] as const

const HARMONY_KEY = 'theme-harmony'
const BASE_COLOR_KEY = 'theme-base-color'
const CUSTOM_VALUE = '__custom__'

export function HarmonySwitcher() {
  const [harmony, setHarmony] = useState<Harmony>('monochromatic')
  const [baseColor, setBaseColor] = useState<string>(BASE_COLORS[0].value)
  const [isCustom, setIsCustom] = useState(false)

  // Read saved preferences on mount (client-only — avoids SSR mismatch)
  useEffect(() => {
    const savedHarmony = localStorage.getItem(HARMONY_KEY) as Harmony | null
    const savedColor = localStorage.getItem(BASE_COLOR_KEY)

    if (savedHarmony) {
      setHarmony(savedHarmony)
      document.documentElement.setAttribute('data-harmony', savedHarmony)
    }
    if (savedColor) {
      setBaseColor(savedColor)
      setIsCustom(!BASE_COLORS.some((c) => c.value === savedColor))
      document.documentElement.style.setProperty('--base-color', savedColor)
    }
  }, [])

  function handleHarmonyChange(value: Harmony) {
    setHarmony(value)
    document.documentElement.setAttribute('data-harmony', value)
    localStorage.setItem(HARMONY_KEY, value)
  }

  function applyBaseColor(value: string) {
    setBaseColor(value)
    document.documentElement.style.setProperty('--base-color', value)
    localStorage.setItem(BASE_COLOR_KEY, value)
  }

  function handleBaseColorSelect(value: string) {
    if (value === CUSTOM_VALUE) {
      setIsCustom(true)
      return
    }
    setIsCustom(false)
    applyBaseColor(value)
  }

  // Native color input gives hex — relative color syntax (oklch(from ...))
  // accepts any valid CSS color as the "from" source, so hex works fine.
  function handleCustomColor(e: React.ChangeEvent<HTMLInputElement>) {
    applyBaseColor(e.target.value)
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-2 w-full md:w-auto">
      <Select
        value={isCustom ? CUSTOM_VALUE : baseColor}
        onValueChange={handleBaseColorSelect}
      >
        <SelectTrigger className="w-full md:w-40" aria-label="Base color">
          <SelectValue placeholder="Base color" />
        </SelectTrigger>
        <SelectContent>
          {BASE_COLORS.map((c) => (
            <SelectItem key={c.value} value={c.value}>
            <span className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full border border-border"
                style={{ backgroundColor: c.value }}
              />
              {c.label}
            </span>
            </SelectItem>
          ))}
          <SelectItem value={CUSTOM_VALUE}>Custom…</SelectItem>
        </SelectContent>
      </Select>

      {isCustom && (
        <input
          type="color"
          onChange={handleCustomColor}
          className="h-8 w-8 cursor-pointer rounded-md border border-border bg-transparent p-0.5"
          aria-label="Pick a custom base color"
        />
      )}

      <Select value={harmony} onValueChange={handleHarmonyChange}>
        <SelectTrigger className="w-full md:w-[180px]" aria-label="Color harmony">
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
    </div>
  )
}
