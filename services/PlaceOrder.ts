import {
    createPublicClient,
    createWalletClient,
    custom
} from "viem";
import { celoAlfajores } from "viem/chains";
import { bookStoreAddress } from "@/utils/addresses/bookstoreContractAddress";
import { bookStoreAddressABI } from "@/utils/abis/bookStoreContractABI";

export const PlaceOrder = async (
    _signerAddress: `0x${string}` | undefined,
    { order }: PlaceOrderProps
): Promise<boolean> => {
    if (window.ethereum) {

        const privateClient = createWalletClient({
            chain: celoAlfajores,
            transport: custom(window.ethereum),
        });
        const publicClient = createPublicClient({
            chain: celoAlfajores,
            transport: custom(window.ethereum),
        });
        const [address] = await privateClient.getAddresses();
        try {
            const publishOrderTxnHash = await privateClient.writeContract({
                account: address,
                address: bookStoreAddress,
                abi: bookStoreAddressABI,
                functionName: "payForYourOrder",
                args: [order],
            });

            const publishOrderTxnReceipt =
                await publicClient.waitForTransactionReceipt({
                    hash: publishOrderTxnHash,
                });

            if (publishOrderTxnReceipt.status == "success") {
                return true;
            }
            return false;

        } catch (error) {
            return false;
        }
    }
    return false;
};

type PlaceOrderProps = {
    order: number;
};
