import {
  Combobox,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxSortableChip,
  ComboboxSortableChips,
  ComboboxValue,
  Label,
  Slider,
  useComboboxAnchor
} from '#/components'
import { PROJECTS_DATA } from '#/data'

export type CVFormData = {
  scale: number[],
  projects: string[]
};

export type CVFormProps = {
  data: CVFormData,
  setData: (data: CVFormData) => void,
};

export const CVForm = ({ data, setData }) => {
    const anchor = useComboboxAnchor()

  return (
    <div className="flex px-2 py-3">
      <div className="flex flex-col mt-3 gap-1 w-full">
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="combobox-projects">Projects</Label>
        </div>
        <Combobox
          autoHighlight
          items={PROJECTS_DATA.map((project) => project.id)}
          multiple
          value={data.projects}
          onValueChange={(projects) => setData({ ...data, projects })}
        >
          <ComboboxSortableChips
            ref={anchor}
            items={data.projects}
            onReorder={(projects) => setData({ ...data, projects })}
          >
            <ComboboxValue>
              {data.projects.map((val) => (
                <ComboboxSortableChip id={val} key={val}>
                  {val}
                </ComboboxSortableChip>
              ))}
            </ComboboxValue>
            <ComboboxChipsInput />
          </ComboboxSortableChips>
          <ComboboxContent anchor={anchor}>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="slider-scale">Scale</Label>
          <span className="text-sm text-muted-foreground">{data.scale}</span>
          <Slider
            id="slider-scale"
            onValueChange={(scale) => setData({ ...data, scale })}
            value={data.scale}
            min={0.4}
            max={1}
            step={0.01}
          />
        </div>
      </div>
    </div>
  )
};
