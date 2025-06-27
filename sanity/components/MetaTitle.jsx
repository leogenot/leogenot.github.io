// /components/MyCustomStringInput.jsx
import {useCallback, useEffect, useState} from 'react'
import {Badge, Card, Stack, TextInput} from '@sanity/ui'
import {set, unset} from 'sanity'
import {useClient} from 'sanity'

export const MetaTitle = (props) => {
  const {minValue = 50, mediumValue = 55, maxValue = 60, elementProps, onChange, value = ''} = props
  const [settingsTitle, setSettingsTitle] = useState('')
  const client = useClient()

  useEffect(() => {
    const fetchSettingsTitle = async () => {
      try {
        // Adjust the GROQ query based on your actual schema
        const query = `*[_type == "settings"][0].title`
        const result = await client.fetch(query)
        setSettingsTitle(result || '')
      } catch (error) {
        console.error('Error fetching settings title:', error)
      }
    }

    fetchSettingsTitle()
  }, [])

  const handleChange = useCallback(
    (event) => {
      const nextValue = event.currentTarget.value
      onChange(nextValue ? set(nextValue) : unset())
    },
    [onChange],
  )

  const titleSeparator = ' | '
  const websiteTitleLength = settingsTitle.length + titleSeparator.length

  const getCountColor = () => {
    if (value.length + websiteTitleLength < minValue) return 'critical'
    if (value.length + websiteTitleLength >= mediumValue && value.length < maxValue)
      return 'positive'
    if (value.length + websiteTitleLength >= maxValue) return 'caution'
    return 'caution'
  }

  return (
    <Stack space={3}>
      {value.length > 0 && settingsTitle && (
        <Card>
          <div style={{color: 'blue', fontWeight: 'normal'}}>
            {value} | {settingsTitle}
          </div>
        </Card>
      )}
      {value.length > 0 && (
        <Card>
          <Badge tone={getCountColor()}>
            {value.length + websiteTitleLength} / {maxValue}
          </Badge>
        </Card>
      )}

      <TextInput {...elementProps} onChange={handleChange} value={value} />
    </Stack>
  )
}
