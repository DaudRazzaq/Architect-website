'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

// ---------------------------------------------------------------------------
// useFormStorage
// ---------------------------------------------------------------------------
// Persists a form's field values to sessionStorage as the user types, so an
// accidental reload/tab-close doesn't lose an in-progress enquiry. The draft
// is restored on mount and explicitly wiped once the form has been submitted
// successfully (call `clearDraft`) so a stale draft never resurfaces.
//
// Scoped to sessionStorage (not localStorage) on purpose — drafts are only
// relevant for the current visit and should not persist indefinitely across
// browser sessions.
// ---------------------------------------------------------------------------

type FormFields = Record<string, string>

export interface UseFormStorageReturn<T extends FormFields> {
  /** Current form values (hydrated from sessionStorage on mount, if present) */
  formData: T
  /** Replace the whole form state */
  setFormData: React.Dispatch<React.SetStateAction<T>>
  /** Drop-in onChange handler for input/textarea/select elements */
  updateField: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void
  /** Resets state to `initialState` and removes the persisted draft */
  clearDraft: () => void
  /** True once the initial sessionStorage read has completed (avoids a hydration flash) */
  isRestored: boolean
}

const PREFIX = 'aureon:form-draft:'

export function useFormStorage<T extends FormFields>(
  key: string,
  initialState: T
): UseFormStorageReturn<T> {
  const storageKey = `${PREFIX}${key}`
  const [formData, setFormData] = useState<T>(initialState)
  const [isRestored, setIsRestored] = useState(false)
  const hydrated = useRef(false)

  // Restore any saved draft once, on mount.
  useEffect(() => {
    try {
      const saved = window.sessionStorage.getItem(storageKey)
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<T>
        setFormData((prev) => ({ ...prev, ...parsed }))
      }
    } catch {
      // Corrupt JSON or storage unavailable (e.g. private browsing) — ignore.
    } finally {
      hydrated.current = true
      setIsRestored(true)
    }
  }, [storageKey])

  // Persist on every change, but only after the initial restore has run so
  // we don't immediately overwrite a saved draft with the blank initial state.
  useEffect(() => {
    if (!hydrated.current) return
    try {
      window.sessionStorage.setItem(storageKey, JSON.stringify(formData))
    } catch {
      // Quota exceeded or storage disabled — draft persistence is best-effort.
    }
  }, [storageKey, formData])

  const updateField = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))
    },
    []
  )

  const clearDraft = useCallback(() => {
    setFormData(initialState)
    try {
      window.sessionStorage.removeItem(storageKey)
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey])

  return { formData, setFormData, updateField, clearDraft, isRestored }
}
