import * as Crypto from "expo-crypto";
import Constants from "expo-constants";

const ENCRYPTION_SECRET_KEY =
  Constants.expoConfig?.extra?.ENCRYPTION_SECRET_KEY || "fallback-key";

export const encryptPassword = async (password: string): Promise<string> => {
  const hash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password + ENCRYPTION_SECRET_KEY
  );
  return hash;
};
