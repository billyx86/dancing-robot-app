import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import { DancingRobot } from './DancingRobot'

describe('DancingRobot', () => {
  afterEach(() => {
    cleanup()
  })

  it('exposes mode buttons as toggle buttons with aria-pressed', () => {
    render(<DancingRobot />)
    const buttons = screen.getAllByRole('button', { name: /^(groove|robot|breakdance|panic)$/i })
    expect(buttons).toHaveLength(4)
    const pressed = buttons.filter((b) => b.getAttribute('aria-pressed') === 'true')
    expect(pressed).toHaveLength(1)
    expect(pressed[0]).toHaveTextContent('groove')
  })

  it('marks the caption paragraph as a polite live region', () => {
    const { container } = render(<DancingRobot />)
    const live = container.querySelector('[aria-live="polite"]')
    expect(live).not.toBeNull()
    expect(live!.textContent!.length).toBeGreaterThan(0)
  })

  it('switches the pressed mode when a mode button is clicked', async () => {
    const user = userEvent.setup()
    render(<DancingRobot />)
    const panic = screen.getByRole('button', { name: 'panic', hidden: false })
    await user.click(panic)
    const group = screen.getByRole('group', { name: /dance modes/i })
    const pressed = within(group)
      .getAllByRole('button')
      .filter((b) => b.getAttribute('aria-pressed') === 'true')
    expect(pressed).toHaveLength(1)
    expect(pressed[0]).toHaveTextContent('panic')
  })

  it('cycles to the next mode when the robot tap target is activated', async () => {
    const user = userEvent.setup()
    render(<DancingRobot />)
    const tapTarget = screen.getByRole('button', { name: /currently in groove mode/i })
    await user.click(tapTarget)
    expect(
      screen.getByRole('button', { name: /currently in robot mode/i }),
    ).toBeInTheDocument()
  })
})
