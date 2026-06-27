'use client'

import { useCallback } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchCustomers } from '@/lib/billing-api'
import { useAuth } from '@/lib/auth-context'
import { queryKeys } from './keys'

const CUSTOMERS_STALE_MS = 10 * 60_000

export function useCustomersQuery() {
  const { user } = useAuth()
  return useQuery({
    queryKey: queryKeys.customers(),
    queryFn: fetchCustomers,
    enabled: Boolean(user),
    staleTime: CUSTOMERS_STALE_MS,
  })
}

export function useInvalidateCustomers() {
  const qc = useQueryClient()
  return useCallback(() => {
    void qc.invalidateQueries({ queryKey: queryKeys.customers() })
  }, [qc])
}
