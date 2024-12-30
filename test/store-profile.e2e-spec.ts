import { expect, test } from '@playwright/test'

test('update profile successfully', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Pizza Shop' }).click()
  await page.getByRole('menuitem', { name: 'Perfil da loja' }).click()

  await page.getByLabel('Nome').fill('Best Pizza Shop')
  await page.getByLabel('Descrição').fill('Best Pizza Shop description')

  await page.getByRole('button', { name: 'Salvar' }).click()

  await page.waitForLoadState('networkidle')

  const toast = page.getByText('Perfil atualizado com sucesso.')

  expect(toast).toBeVisible()

  await page.getByRole('button', { name: 'Close' }).click()

  expect(await page.getByRole('button', { name: 'Best Pizza Shop' })).toBeVisible()
})

test('update profile error', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Pizza Shop' }).click()
  await page.getByRole('menuitem', { name: 'Perfil da loja' }).click()

  await page.getByLabel('Nome').fill('Another best Pizza Shop')
  await page.getByLabel('Descrição').fill('Another best Pizza Shop description')

  await page.getByRole('button', { name: 'Salvar' }).click()

  await page.waitForLoadState('networkidle')

  const toast = page.getByText('Erro ao atualizar o perfil. Tente novamente.')

  expect(toast).toBeVisible()

  await page.getByRole('button', { name: 'Close' }).click()

  expect(await page.getByRole('button', { name: 'Pizza Shop' })).toBeVisible()
})