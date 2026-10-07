'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { caretAfterDigits, formatPounds } from '@/lib/enquiry'

// ---------------------------------------------------------------------------
// usePoundsInput
// ---------------------------------------------------------------------------
// Drives a controlled "amount in pounds" text input: only digits are kept and
// they're grouped as you type ("25000" → "25,000").
//
// Re-inserting the commas makes React rewrite the input's value, which throws
// the caret to the end — so editing mid-number would jump. The caret is put
// back in a layout effect, i.e. after React has written the value to the DOM.
// That ordering also covers a rejected keystroke (a letter typed mid-number),
// where the value is unchanged and React restores it only after the event.
// ---------------------------------------------------------------------------

export function usePoundsInput(commit: (value: string) => void) {
  const ref = useRef<HTMLInputElement>(null)
  const pendingCaret = useRef<number | null>(null)
  // Bumped on every keystroke so a commit (and the effect) always follows,
  // even when the formatted value is identical to the previous one.
  const [edits, setEdits] = useState(0)

  useLayoutEffect(() => {
    const input = ref.current
    const caret = pendingCaret.current
    pendingCaret.current = null
    if (input && caret !== null && document.activeElement === input) {
      input.setSelectionRange(caret, caret)
    }
  }, [edits])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, selectionStart } = e.target
    const digitsBeforeCaret = value.slice(0, selectionStart ?? value.length).replace(/\D/g, '').length
    const formatted = formatPounds(value)
    pendingCaret.current = caretAfterDigits(formatted, digitsBeforeCaret)
    commit(formatted)
    setEdits((n) => n + 1)
  }

  return { ref, onChange }
}
