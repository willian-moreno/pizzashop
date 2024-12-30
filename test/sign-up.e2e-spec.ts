import { expect, test } from '@playwright/test'

test('sign up successfully', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.locator('#restaurantName').fill('Pizza Shop')
  await page.locator('#managerName').fill('John Doe')
  await page.locator('#email').fill('johndoe@example.com')
  await page.locator('#phone').fill('11987456321')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Resturante cadastrado com sucesso.')

  expect(toast).toBeVisible()
})

test('sign up with some field empty', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Erro ao cadastrar restaurante.')

  expect(toast).toBeVisible()
})

test('navigate to new login page', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Fazer login' }).click()

  expect(page.url()).toContain('/sign-in')
})
