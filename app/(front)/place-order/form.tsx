'use client'
import CheckoutSteps from '@/components/checkOut'
import userCartService from '@/lib/hooks/userCart'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { PlaceOrder } from '@/services/PlaceOrder'
import { useAccount } from 'wagmi' // Assuming you are using wagmi for wallet connection
import { Button, useToast } from '@chakra-ui/react'
import { checkIfUserExists } from '@/services/checkIfUserExists'
import { getUserByWalletAddress } from '@/services/getUserByWalletAddress'
import { bookStoreUser } from '@/entities/bookStoreUser'

const Form = () => {

  const [IsPurchasing, setIsPurchasing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userExists, setUserExists] = useState(false);
  const [bookStoreUser, setBookstoreUser] = useState<bookStoreUser | null>(null);



  const toast = useToast();


  const router = useRouter()
  const { address } = useAccount() // Get the connected wallet address

  const {
    paymentMethod,
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    clear,
  } = userCartService()






  const placeOrder = async () => {

          const purchase = await PlaceOrder(address, { order:totalPrice});

      if (purchase) {
        setIsPurchasing(true);
        toast({
          description: "Order has been placed successfully.",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
        clear();
        router.push('/');
        return;
      } else {
        setIsPurchasing(false);
        toast({
          description: "Order placing failed",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
        return;
      }


  
  };

  useEffect(() => {

    const checkIfUserExistsAndSet = async () => {
      if (address) {
        const doesUserExist = await checkIfUserExists(address);
        setUserExists(doesUserExist);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };

    const fetchUserByWalletAddress = async () => {
      const fetchedBookStoreUser = await getUserByWalletAddress(address, {
        _walletAddress: address as `0x${string}`,
      });

      setBookstoreUser(fetchedBookStoreUser);
    };

    checkIfUserExistsAndSet();
    fetchUserByWalletAddress();
  }, [address, userExists, bookStoreUser]);

  const [isPlacing, setIsPlacing] = useState(false)

  useEffect(() => {
    if (!paymentMethod) {
      return router.push('/payment')
    }
    if (items.length === 0) {
      return router.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethod, router])

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <></>

  
    

    

  return (
    <div>
      <CheckoutSteps current={4} />

      <div className="grid md:grid-cols-4 md:gap-5 my-4">
        <div className="overflow-x-auto md:col-span-3">
          <div className="card bg-base-300">
            <div className="card-body">
              <h2 className="card-title">Shipping Address</h2>
              <p>{shippingAddress.fullName}</p>
              <p>
                {shippingAddress.address}, {shippingAddress.city},{' '}
                {shippingAddress.postalCode}, {shippingAddress.country}{' '}
              </p>
              <div>
                <Link className="btn" href="/shipping">
                  Edit
                </Link>
              </div>
            </div>
          </div>

          <div className="card bg-base-300 mt-4">
            <div className="card-body">
              <h2 className="card-title">Payment Method</h2>
              <p>{paymentMethod}</p>
              <div>
                <Link className="btn" href="/payment">
                  Edit
                </Link>
              </div>
            </div>
          </div>

          <div className="card bg-base-300 mt-4">
            <div className="card-body">
              <h2 className="card-title">Items</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.slug}>
                      <td>
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          ></Image>
                         
                        </Link>
                      </td>
                      <td>
                        <span>{item.qty}</span>
                      </td>
                      <td>${item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <Link className="btn" href="/cart">
                  Edit
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="card bg-base-300">
            <div className="card-body">
              <h2 className="card-title">Order Summary</h2>
              <ul className="space-y-3">
                <li>
                  <div className=" flex justify-between">
                    <div>Items</div>
                    <div>${itemsPrice}</div>
                  </div>
                </li>
                <li>
                  <div className=" flex justify-between">
                    <div>Tax</div>
                    <div>${taxPrice}</div>
                  </div>
                </li>
                <li>
                  <div className=" flex justify-between">
                    <div>Shipping</div>
                    <div>${shippingPrice}</div>
                  </div>
                </li>
                <li>
                  <div className=" flex justify-between">
                    <div>Total</div>
                    <div>${totalPrice}</div>
                  </div>
                </li>

                <li>
                <Button
                  bgColor={"#EA1845"}
                  textColor={"white"}
                  loadingText="Buying Ticket"
                  isLoading={IsPurchasing}
                  onClick={placeOrder}
                  _hover={{
                    bgColor: "#6600D5",
                    //   color: "black",
                  }}
                  marginRight={4}
                  >
                    Place Order
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Form
