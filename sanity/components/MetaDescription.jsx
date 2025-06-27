// /components/MyCustomStringInput.jsx
import {useCallback} from 'react'
import {Badge, Card, TextArea, Stack} from '@sanity/ui'
import {set, unset} from 'sanity'

export const MetaDescription = (props) => {
  const {
    minValue = 70,
    mediumValue = 110,
    maxValue = 160,
    elementProps,
    onChange,
    value = '',
  } = props

  const handleChange = useCallback(
    (event) => {
      const nextValue = event.currentTarget.value
      onChange(nextValue ? set(nextValue) : unset())
    },
    [onChange],
  )

  const getCountColor = () => {
    if (value.length < minValue) return 'critical'
    if (value.length >= mediumValue && value.length < maxValue) return 'positive'
    if (value.length >= maxValue) return 'caution'
    return 'caution'
  }

  return (
    <Stack space={3}>
      {value.length > 0 && (
        <Card>
          <Badge tone={getCountColor()}>
            {value.length} / {maxValue}
          </Badge>
        </Card>
      )}

      <TextArea {...elementProps} onChange={handleChange} value={value} />
    </Stack>
  )
}
