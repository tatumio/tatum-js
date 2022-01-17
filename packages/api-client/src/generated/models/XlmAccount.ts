/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type XlmAccount = {
    /**
     * A unique identifier for this account.
     */
    id?: string;
    /**
     * This account’s public key encoded in a base32 string representation.
     */
    account_id?: string;
    /**
     * This account’s current sequence number. For use when submitting this account’s next transaction.
     */
    sequence?: string;
    /**
     * The number of subentries on this account.
     */
    subentry_count?: number;
    /**
     * The ID of the last ledger that included changes to this account.
     */
    last_modified_ledger?: number;
    /**
     * Operations have varying levels of access. This field specifies thresholds for different access levels, as well as the weight of the master key.
     */
    thresholds?: {
        /**
         * The weight required for a valid transaction including the Allow Trust and Bump Sequence operations.
         */
        low_threshold?: number;
        /**
         * The weight required for a valid transaction including the Create Account, Payment, Path Payment, Manage Buy Offer, Manage Sell Offer, Create Passive Sell Offer, Change Trust, Inflation, and Manage Data operations.
         */
        med_threshold?: number;
        /**
         * The weight required for a valid transaction including the Account Merge and Set Options operations.
         */
        high_threshold?: number;
    };
    /**
     * Flags denote the enabling/disabling of certain asset issuer privileges.
     */
    flags?: {
        /**
         * If set to true, anyone who wants to hold an asset issued by this account must first be approved by this account.
         */
        auth_required?: boolean;
        /**
         * If set to true, this account can freeze the balance of a holder of an asset issued by this account.
         */
        auth_revocable?: boolean;
        /**
         * If set to true, none of the following flags can be changed.
         */
        auth_immutable?: boolean;
    };
    /**
     * The assets this account holds.
     */
    balances?: Array<{
        /**
         * The number of units of an asset held by this account.
         */
        balance?: string;
        /**
         * The maximum amount of this asset that this account is willing to accept. Specified when opening a trustline.
         */
        limit?: string;
        /**
         * The sum of all buy offers owned by this account for this asset.
         */
        buying_liabilities?: string;
        /**
         * The sum of all sell offers owned by this account for this asset.
         */
        selling_liabilities?: string;
        /**
         * Either native, credit_alphanum4, or credit_alphanum12.
         */
        asset_type?: string;
        /**
         * The code for this asset.
         */
        asset_code?: string;
        /**
         * The Stellar address of this asset’s issuer.
         */
        asset_issuer?: string;
    }>;
    /**
     * The public keys and associated weights that can be used to authorize transactions for this account. Used for multi-sig.
     */
    signers?: Array<{
        /**
         * The numerical weight of a signer. Used to determine if a transaction meets the threshold requirements.
         */
        weight?: number;
        /**
         * A hash of characters dependent on the signer type.
         */
        key?: string;
        /**
         * The type of hash for this signer.
         */
        type?: 'sha256_hash' | 'ed25519_public_key' | 'preauth_tx';
    }>;
    /**
     * An array of account data fields.
     */
    data?: any;
}
