import { expect, test } from '@playwright/test'

test('display month revenue orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  expect(page.getByText('R$ 4.584,70', { exact: true })).toBeVisible()
  expect(page.getByText('+10% em relação ao mês passado', { exact: true })).toBeVisible()
})

test('display month orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  expect(page.getByText('356', { exact: true })).toBeVisible()
  expect(page.getByText('-5% em relação ao mês passado', { exact: true })).toBeVisible()
})

test('display day orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  expect(page.getByText('34', { exact: true })).toBeVisible()
  expect(page.getByText('-5% em relação a ontem', { exact: true })).toBeVisible()
})

test('display month canceled orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  expect(page.getByText('7', { exact: true })).toBeVisible()
  expect(page.getByText('-18% em relação ao mês passado', { exact: true })).toBeVisible()
})
