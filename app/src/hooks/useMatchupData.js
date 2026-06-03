import { useState, useEffect } from 'react'

function nameToSlug(name) {
  return name.replace(/\s+/g, '_')
}

export function useCharacterData(name) {
  const [data, setData]     = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState(null)

  useEffect(() => {
    if (!name) return
    setLoading(true)
    setData(null)
    fetch(`${import.meta.env.BASE_URL}data/${nameToSlug(name)}.json`)
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json() })
      .then(d => { setData(d); setLoading(false) })
      .catch(e => { setError(e.message); setLoading(false) })
  }, [name])

  return { data, loading, error }
}
