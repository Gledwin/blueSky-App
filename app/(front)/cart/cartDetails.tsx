'use client'

import useCartService from '@/lib/hooks/userCart'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { checkIfUserExists } from "@/services/checkIfUserExists";
import {useToast,} from "@chakra-ui/react";
import { useAccount, useConnect } from "wagmi";
import BecomeAUser from "@/app/become-a-user/page";
import { bookStoreUser } from '@/entities/bookStoreUser'
import { getUserByWalletAddress } from "@/services/getUserByWalletAddress";
import { makeCreatingUser } from "@/services/makeCreatingUser";
import ProductItem from '@/components/products/productItem'
import data from '@/lib/data'

export default function CartDetails() {


  
  const [userExists, setUserExists] = useState(false);
  const toast = useToast();

  const [userAddress, setUserAddress] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const { connect } = useConnect();

  const { address, isConnected } = useAccount();

  const [bookStoreUser, setBookStoreUser] = useState<bookStoreUser | null>(null);


  




   
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

      setBookStoreUser(fetchedBookStoreUser);
    };

    checkIfUserExistsAndSet();
    fetchUserByWalletAddress();
  }, [
    address,
    userExists,
    bookStoreUser,

  ]);

  const router = useRouter()
  const { items, itemsPrice, decrease, increase } = useCartService()

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <></>

  return (
    <>
   {userExists ? (
    <main>
      <h1 className="py-4 text-2xl">Shopping Cart</h1>

      {items.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
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
                        <span className="px-2">{item.name}</span>
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn"
                        type="button"
                        onClick={() => decrease(item)}
                      >
                        -
                      </button>
                      <span className="px-2">{item.qty}</span>
                      <button
                        className="btn"
                        type="button"
                        onClick={() => increase(item)}
                      >
                        +
                      </button>
                    </td>
                    <td>${item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div className="card bg-base-300">
              <div className="card-body">
                <ul>
                  <li>
                    <div className="pb-3 text-xl">
                      Subtotal ({items.reduce((a, c) => a + c.qty, 0)}) : $
                      {itemsPrice}
                    </div>
                  </li>
                  <li>
                      <button
                      onClick={() => router.push('/shipping')}
                      className="btn btn-primary w-full"
                    >
                      Proceed to Checkout
                      </button>
                  
                   
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      </main>
    ) : (
      <BecomeAUser />
    )}
    </>
  )
}
