'use client';
import { useCallback, useEffect, useState } from 'react';

type UseFetchOptions = Omit<RequestInit, 'body'> & {
  immediate?: boolean;
};

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  fetchData: (
    body?: Record<string, unknown> | BodyInit | null,
    params?: Record<string, string>,
  ) => Promise<T | undefined>;
}

/**
 * Hook customizado para realizar requisições fetch e padronizar o tratamento de
 * estado (loading, data, error) na aplicação.
 *
 * @template T O tipo de dado esperado da resposta.
 * @param {string} url A URL para a qual a requisição será feita.
 * @param {UseFetchOptions} [options] Opções para a requisição fetch, incluindo `immediate` para executar a requisição ao montar o componente.
 * @returns {UseFetchResult<T>} Um objeto contendo o estado da requisição (`data`, `loading`, `error`) e a função `fetchData` para disparar a requisição.
 *
 * @example
 * // Requisição GET ao montar o componente
 * const { data, loading, error } = useFetch('/api/users', { immediate: true });
 *
 * if (loading) return <p>Carregando...</p>;
 * if (error) return <p>Erro: {error.message}</p>;
 *
 * @example
 * // Requisição POST sob demanda
 * const { fetchData, loading } = useFetch('/api/users', { method: 'POST' });
 * const handleCreateUser = async () => {
 *   try {
 *     const newUser = await fetchData({ name: 'John Doe' });
 *     console.log('Usuário criado:', newUser);
 *   } catch (error) {
 *     console.error('Falha ao criar usuário:', error);
 *   }
 * };
 */
export default function UseFetch<T>(
  url: string,
  options: UseFetchOptions = {},
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const { immediate = false, ...fetchOptions } = options;

  const fetchData = useCallback(
    async (
      body?: Record<string, unknown> | BodyInit | null,
      params?: Record<string, string>,
    ): Promise<T | undefined> => {
      setLoading(true);
      setError(null);

      let finalUrl = url.startsWith('http') ? url : `/api/v1${url}`;

      if (params) {
        const searchParams = new URLSearchParams(params);
        finalUrl = `${url}?${searchParams.toString()}`;
      }

      const isJsonBody =
        typeof body === 'object' &&
        body !== null &&
        !(body instanceof Blob) &&
        !(body instanceof FormData) &&
        !(body instanceof URLSearchParams);

      const headers: HeadersInit = new Headers(fetchOptions.headers);

      if (isJsonBody) {
        headers.set('Content-Type', 'application/json');
      }

      try {
        const response = await fetch(finalUrl, {
          ...fetchOptions,
          headers,
          body: isJsonBody
            ? JSON.stringify(body)
            : (body as BodyInit | null | undefined),
        });

        const responseData = await response.json().catch(() => null);

        if (!response.ok) {
          const errorMessage =
            responseData?.message ||
            `Erro na requisição: ${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
        }

        setData(responseData);
        return responseData;
      } catch (e) {
        setError(e as Error);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [url, JSON.stringify(fetchOptions)],
  );

  useEffect(() => {
    if (immediate) {
      fetchData().catch(() => {
        // O erro já é tratado no estado 'error' do hook.
        // Este catch evita um erro de "Uncaught (in promise)" no console
        // quando a requisição inicial falha.
      });
    }
  }, [fetchData, immediate]);

  return { data, loading, error, fetchData };
}
