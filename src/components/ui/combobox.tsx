'use client'

import * as React from 'react'
import { Combobox as ComboboxPrimitive } from '@base-ui/react'
import { cn } from 'cn'
import { CheckIcon, ChevronDownIcon, XIcon } from 'lucide-react'

import { Button } from '#/components/ui/button.tsx'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '#/components/ui/input-group.tsx'

import { motion } from 'framer-motion'

import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable'
import type {
  SortingStrategy
} from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities'

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'

import type { DragOverEvent } from '@dnd-kit/core'

const Combobox = ComboboxPrimitive.Root

function ComboboxValue({ ...props }: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />
}

function ComboboxTrigger({
  className,
  children,
  ...props
}: ComboboxPrimitive.Trigger.Props) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={cn("[&_svg:not([class*='size-'])]:size-4", className)}
      {...props}
    >
      {children}
      <ChevronDownIcon
        data-slot="combobox-trigger-icon"
        className="pointer-events-none size-4 text-muted-foreground"
      />
    </ComboboxPrimitive.Trigger>
  )
}

function ComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      render={<InputGroupButton variant="ghost" size="icon-xs" />}
      className={cn(className)}
      {...props}
    >
      <XIcon className="pointer-events-none" />
    </ComboboxPrimitive.Clear>
  )
}

function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean
  showClear?: boolean
}) {
  return (
    <InputGroup className={cn('w-auto', className)}>
      <ComboboxPrimitive.Input
        render={<InputGroupInput disabled={disabled} />}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        {showTrigger && (
          <InputGroupButton
            size="icon-xs"
            variant="ghost"
            asChild
            data-slot="input-group-button"
            className="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
            disabled={disabled}
          >
            <ComboboxTrigger />
          </InputGroupButton>
        )}
        {showClear && <ComboboxClear disabled={disabled} />}
      </InputGroupAddon>
      {children}
    </InputGroup>
  )
}

function ComboboxContent({
  className,
  side = 'bottom',
  sideOffset = 6,
  align = 'start',
  alignOffset = 0,
  anchor,
  ...props
}: ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    'side' | 'align' | 'sideOffset' | 'alignOffset' | 'anchor'
  >) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="isolate z-50"
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          data-chips={!!anchor}
          className={cn(
            'group/combobox-content relative max-h-96 w-(--anchor-width) max-w-(--available-width) origin-(--transform-origin) overflow-hidden rounded-md text-popover-foreground ring-1 ring-foreground/10 duration-100 data-[chips=true]:min-w-(--anchor-width) data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:border-input/30 *:data-[slot=input-group]:bg-input/30 *:data-[slot=input-group]:shadow-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:fade-out-0 data-closed:zoom-out-95',
            className,
          )}
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  )
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn(
        'max-h-[min(calc(--spacing(96)-(--spacing(9))),calc(var(--available-height)-(--spacing(9))))] scroll-py-1 overflow-y-auto p-1',
        className,
      )}
      {...props}
    />
  )
}

function ComboboxItem({
  className,
  children,
  ...props
}: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(
        "relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <ComboboxPrimitive.ItemIndicator
        data-slot="combobox-item-indicator"
        render={
          <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />
        }
      >
        <CheckIcon className="pointer-events-none size-4 pointer-coarse:size-5" />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  )
}

function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return (
    <ComboboxPrimitive.Group
      data-slot="combobox-group"
      className={cn(className)}
      {...props}
    />
  )
}

function ComboboxLabel({
  className,
  ...props
}: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={cn(
        'px-2 py-1.5 text-xs text-muted-foreground pointer-coarse:px-3 pointer-coarse:py-2 pointer-coarse:text-sm',
        className,
      )}
      {...props}
    />
  )
}

function ComboboxCollection({ ...props }: ComboboxPrimitive.Collection.Props) {
  return (
    <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
  )
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn(
        'hidden w-full justify-center py-2 text-center text-sm text-muted-foreground',
        className,
      )}
      {...props}
    />
  )
}

function ComboboxSeparator({
  className,
  ...props
}: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={cn('-mx-1 my-1 h-px bg-border', className)}
      {...props}
    />
  )
}

function ComboboxChips({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> &
  ComboboxPrimitive.Chips.Props) {
  return (
    <ComboboxPrimitive.Chips
      data-slot="combobox-chips"
      className={cn(
        'flex min-h-9 flex-wrap items-center gap-1.5 rounded-md border border-input bg-transparent bg-clip-padding px-2.5 py-1.5 text-sm shadow-xs transition-[color,box-shadow] focus-within:ring-[3px] focus-within:ring-ring/50',
        className,
      )}
      {...props}
    />
  )
}

function ComboboxChip({
  className,
  children,
  showRemove = true,
  ...props
}: ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean
}) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={cn(
        'flex h-[calc(--spacing(5.5))] w-fit items-center justify-center gap-1 rounded-sm bg-muted px-1.5 text-xs font-medium whitespace-nowrap text-foreground has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-data-[slot=combobox-chip-remove]:pr-0',
        className,
      )}
      {...props}
    >
      {children}
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          render={<Button variant="ghost" size="icon-xs" />}
          className="-ml-1 opacity-50 hover:opacity-100"
          data-slot="combobox-chip-remove"
        >
          <XIcon className="pointer-events-none" />
        </ComboboxPrimitive.ChipRemove>
      )}
    </ComboboxPrimitive.Chip>
  )
}

function ComboboxChipsInput({
  className,
  children,
  ...props
}: ComboboxPrimitive.Input.Props) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      className={cn('min-w-16 flex-1 outline-none', className)}
      {...props}
    />
  )
}

interface ComboboxSortableChipsProps<
  T extends string | number = string,
> extends React.ComponentPropsWithoutRef<typeof ComboboxChips> {
  items: T[]
  strategy?: SortingStrategy
  onReorder?: (items: T[]) => void
}

const ComboboxSortableChips = React.forwardRef<
  HTMLDivElement,
  ComboboxSortableChipsProps<any>
>(function ComboboxSortableChips(
  { items, onReorder, children, className, ...props },
  ref,
) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const liveItems = React.useRef(items)
  React.useEffect(() => {
    liveItems.current = items
  }, [items])

  // Re-measuring on every DOM mutation (MeasuringStrategy.Always) combined
  // with a synchronous setState in onDragOver creates a feedback loop:
  // reorder -> DOM changes -> remeasure -> new collision -> another
  // onDragOver -> reorder again, all in the same tick, never reaching a
  // paint. This lock caps it to one reorder per animation frame, which
  // breaks the synchronous recursion while still feeling instant.
  const lockedRef = React.useRef(false)

  const handleDragOver = (event: DragOverEvent) => {
    if (lockedRef.current) return

    const { active, over } = event
    if (!over || active.id === over.id) return

    const current = liveItems.current
    const oldIndex = current.findIndex((item) =>
      typeof item === 'object' && item !== null ? item.id === active.id : item === active.id,
    )
    const newIndex = current.findIndex((item) =>
      typeof item === 'object' && item !== null ? item.id === over.id : item === over.id,
    )

    if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return

    lockedRef.current = true
    const next = arrayMove(current, oldIndex, newIndex)
    liveItems.current = next
    onReorder?.(next)

    requestAnimationFrame(() => {
      lockedRef.current = false
    })
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      // Default measuring (WhileDragging, debounced) is enough now that
      // reorders are frame-locked — Always is what caused the loop.
      onDragOver={handleDragOver}
    >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <ComboboxChips ref={ref} className={className} {...props}>
          {children}
        </ComboboxChips>
      </SortableContext>
    </DndContext>
  )
})

interface ComboboxSortableChipProps extends ComboboxPrimitive.Chip.Props {
  id: string
  showRemove?: boolean
  disabled?: boolean
}

function ComboboxSortableChip({
  id,
  className,
  style: styleProp,
  disabled,
  children,
  showRemove = true,
  ...props
}: ComboboxSortableChipProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({
      id,
      disabled,
      animateLayoutChanges: () => false, // we're driving layout ourselves now
    })

  // Only apply dnd-kit's transform to the chip you're actively dragging,
  // so it tracks the pointer. Every other chip is positioned by the real
  // reflow + Framer Motion's `layout` FLIP animation, which measures actual
  // rects rather than assuming a uniform grid cell size.
  const style: React.CSSProperties = isDragging
    ? {
        transform: CSS.Translate.toString(transform),
        zIndex: 10,
        opacity: 0.5,
        ...styleProp,
      }
    : { ...styleProp }

  return (
    <motion.div layout transition={{ duration: 0.2 }} className="contents">
      <ComboboxChip
        ref={setNodeRef}
        id={id}
        style={style}
        showRemove={showRemove}
        className={cn(isDragging && 'touch-none', className)}
        {...attributes}
        {...listeners}
        {...props}
      >
        {children}
      </ComboboxChip>
    </motion.div>
  )
}

function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null)
}

export {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxSortableChips,
  ComboboxSortableChip,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
}
