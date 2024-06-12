import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { cookieStorage, createStorage } from 'wagmi'
import { klaytnBaobab, klaytn,arbitrumNova,arbitrumSepolia } from 'wagmi/chains'

// Get projectId at https://cloud.walletconnect.com
export const projectId ="55d1d12d6559f3c11fab7b9d7f62950a";

if (!projectId) throw new Error('Project ID is not defined')

const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Create wagmiConfig
const chains = [klaytnBaobab, klaytn,arbitrumNova,arbitrumSepolia] as const
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  enableEmail: true,
  storage: createStorage({
    storage: cookieStorage
  }),

})