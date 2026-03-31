/**
 * Solana $CRUDE Token Integration
 * ================================
 * This module handles the connection between Crude Rush and the Solana blockchain.
 */

export const CRUDE_TOKEN_CONFIG = {
  mintAddress: "CRUDE_TOKEN_MINT_ADDRESS_HERE",
  decimals: 9,
  programId: "CRUDE_GAME_PROGRAM_ID_HERE",
  treasuryWallet: "CRUDE_TREASURY_WALLET_HERE",
  rpcEndpoint: "https://api.devnet.solana.com",
  network: "devnet",
};

export const EXCHANGE_RATES = {
  oilPerCrude: 2380,
  crudePerSecondSkip: 0.1,
  minSellAmount: 500,
};

export async function connectWallet() {
  if (typeof window !== "undefined" && window.solana?.isPhantom) {
    try {
      const response = await window.solana.connect();
      return { connected: true, publicKey: response.publicKey.toString(), wallet: window.solana };
    } catch (err) {
      return { connected: false, error: err.message };
    }
  }
  return {
    connected: true,
    publicKey: "CrudeDemo" + Math.random().toString(36).slice(2, 8) + "...sol",
    wallet: null,
    isDemo: true,
  };
}

export async function spendCrude(wallet, amount) {
  if (!wallet || wallet.isDemo) {
    return { success: true, txHash: "demo_" + Date.now(), amount };
  }
  return { success: true, txHash: "placeholder", amount };
}

export async function earnCrude(wallet, oilAmount) {
  const crudeAmount = oilAmount / EXCHANGE_RATES.oilPerCrude;
  if (!wallet || wallet.isDemo) {
    return { success: true, txHash: "demo_" + Date.now(), crudeAmount };
  }
  return { success: true, txHash: "placeholder", crudeAmount };
}

export async function getCrudeBalance(walletPublicKey) {
  return 0;
}
