import { expect, test } from '@playwright/test'

test('list orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  expect(page.getByRole('cell', { name: 'John Doe 1', exact: true })).toBeVisible()
  expect(page.getByRole('cell', { name: 'John Doe 10', exact: true })).toBeVisible()
})

test('paginate orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Próxima página' }).click()

  expect(page.getByRole('cell', { name: 'John Doe 11', exact: true })).toBeVisible()
  expect(page.getByRole('cell', { name: 'John Doe 20', exact: true })).toBeVisible()

  await page.getByRole('button', { name: 'Última página' }).click()

  expect(page.getByRole('cell', { name: 'John Doe 91', exact: true })).toBeVisible()
  expect(page.getByRole('cell', { name: 'John Doe 100', exact: true })).toBeVisible()

  await page.getByRole('button', { name: 'Página anterior' }).click()

  expect(page.getByRole('cell', { name: 'John Doe 81', exact: true })).toBeVisible()
  expect(page.getByRole('cell', { name: 'John Doe 90', exact: true })).toBeVisible()

  await page.getByRole('button', { name: 'Primeira página' }).click()

  expect(page.getByRole('cell', { name: 'John Doe 1', exact: true })).toBeVisible()
  expect(page.getByRole('cell', { name: 'John Doe 10', exact: true })).toBeVisible()
})

test('filter by order id', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('ID do pedido').fill('custom-order-id-50')

  await page.getByRole('button', { name: 'Filtrar resultados' }).click()

  expect(page.getByRole('cell', { name: 'custom-order-id-50' })).toBeVisible()
})

test('filter by customer name', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('Nome do cliente').fill('John Doe 50')

  await page.getByRole('button', { name: 'Filtrar resultados' }).click()

  expect(page.getByRole('cell', { name: 'John Doe 50', exact: true })).toBeVisible()
})

test('filter by status', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByRole('combobox').click()
  await page.getByLabel('Pendente').click()

  await page.getByRole('button', { name: 'Filtrar resultados' }).click()

  const tableStatusRows = await page.getByRole('cell', { name: 'Pendente' }).all()

  expect(tableStatusRows).toHaveLength(10)
})
