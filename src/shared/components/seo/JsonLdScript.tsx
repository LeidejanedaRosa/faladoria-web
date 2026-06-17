interface JsonLdScriptProps {
  data: Record<string, unknown>
  prettyPrint?: boolean
}

export const JsonLdScript = ({
  data,
  prettyPrint = false,
}: JsonLdScriptProps) => {
  const jsonString = (
    prettyPrint ? JSON.stringify(data, null, 2) : JSON.stringify(data)
  ).replace(/<\/script>/gi, '<\\/script>')

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  )
}
