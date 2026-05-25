'use client'

import { useState, useCallback } from 'react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type FormState = 'idle' | 'loading' | 'success' | 'error'

export interface UseContactFormReturn {
  /** Raw state machine value */
  state: FormState
  /** True while the request is in-flight */
  loading: boolean
  /** True once the server confirms delivery */
  success: boolean
  /** Human-readable error string, null when none */
  error: string | null
  /**
   * Submit the form fields.
   * @param fields  Key/value map of all form inputs (empty strings are filtered out server-side).
   * @param source  Identifies which form triggered the submission (e.g. "contact-page").
   */
  submit: (fields: Record<string, string>, source: string) => Promise<void>
  /** Reset back to idle (use when reopening/clearing the form) */
  reset: () => void
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------
export function useContactForm(): UseContactFormReturn {
  const [state, setState] = useState<FormState>('idle')
  const [error, setError] = useState<string | null>(null)

  const submit = useCallback(
    async (fields: Record<string, string>, source: string) => {
      setState('loading')
      setError(null)

      try {
        const res = await fetch('/api/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ source, fields }),
        })

        const data: { error?: string } = await res.json()

        if (!res.ok) {
          throw new Error(data.error ?? 'Something went wrong. Please try again.')
        }

        setState('success')
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Something went wrong. Please try again.'
        setError(message)
        setState('error')
      }
    },
    [],
  )

  const reset = useCallback(() => {
    setState('idle')
    setError(null)
  }, [])

  return {
    state,
    loading: state === 'loading',
    success: state === 'success',
    error,
    submit,
    reset,
  }
}
