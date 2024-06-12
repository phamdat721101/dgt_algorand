import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { cookieStorage, createStorage } from 'wagmi'
import { klaytnBaobab, klaytn } from 'wagmi/chains'

// Get projectId at https://cloud.walletconnect.com
export const projectId ="8caaedef-5bab-4d99-8c3b-be203bbbf3d7=d96276e21abb6909125f9cecca34086bcc1ac04ae0f2ffcca88a26e2a8506b83";

if (!projectId) throw new Error('Project ID is not defined')

const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Create wagmiConfig
const chains = [klaytnBaobab, klaytn] as const
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