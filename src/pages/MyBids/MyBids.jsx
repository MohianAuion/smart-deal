import React, { use, useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaUser } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import noImage from "../../assets/noImage.png";

const MyBids = () => {
  const { user } = use(AuthContext);

  const [myBids, setMyBids] = useState([]);
  const [showAllBids, setShowAllBids] = useState(false);

  const visibleBids = showAllBids ? myBids : myBids.slice(0, 7);


useEffect(() => {
  if (!user?.email) return;

  const loadBids = async () => {
    try {
      const token = await user.getIdToken();
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/bids?email=${user.email}`,
        { headers: { authorization: `Bearer ${token}` } },
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error("Bids request failed:", res.status, err);
        return;
      }

      const data = await res.json();
      setMyBids([...data].sort((a, b) => b.bid_price - a.bid_price));
    } catch (err) {
      console.error("Failed to load bids:", err);
    }
  };

  loadBids();
}, [user]);


  // useEffect(() => {
  //   if (user?.email) {
  //     fetch(`${import.meta.env.VITE_API_URL}/bids?email=${user.email}`, {
  //       headers: {
  //         authorization: `Bearer ${user.accessToken}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         const sortBidsPrice = [...data].sort(
  //           (a, b) => b.bid_price - a.bid_price,
  //         );

  //         setMyBids(sortBidsPrice);
  //       });
  //   }
  // }, [user]);

  // generate token by myself
  // useEffect(() => {
  //   if (user?.email) {
  //     fetch(`http://localhost:3000/bids?email=${user.email}`,{
  //       headers : {
  //         authorization : `Bearer ${localStorage.getItem("token")}`
  //       }
  //     })
  //       .then((res) => res.json())
  //      .then((data) => {
  //         console.log(user.accessToken)
  //         const sortBidsPrice=[...data].sort((a, b)=>b.bid_price - a.bid_price)
  //         setMyBids(sortBidsPrice);
  //       });
  //   }
  // }, [user]);

  // Handle remove bid
  const handleRemoveBid = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_URL}/bids/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("bid deleted", data);

            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your bid has been deleted.",
                icon: "success",
                confirmButtonColor: "#FFCA28",
              });

              const remainingBids = myBids.filter((bid) => bid._id !== _id);

              setMyBids(remainingBids);
            }
          });
      }
    });
  };

  // Handle see more and see less
  const handleSeeMore = () => {
    console.log("see more bids");
    setShowAllBids(!showAllBids);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="w-11/12 sm:w-10/12 mx-auto py-8 sm:py-10 lg:py-14">
        {/* Page heading */}
        <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8">
          My Bids : <span className="text-yellow-400">{myBids.length}</span>
        </h2>

        {/* ================================= */}
        {/* MOBILE BID CARDS */}
        {/* ================================= */}

        <div className="lg:hidden flex flex-col gap-4">
          {visibleBids.map((myBid, index) => {
            const productImage = myBid.product_image || myBid.image || noImage;

            const productTitle =
              myBid.product_title || myBid.title || "Product";

            const sellerName = myBid.seller_name || "Seller";

            const sellerEmail = myBid.seller_email || "";

            const sellerImage = myBid.seller_image || "";

            return (
              <div
                key={myBid._id}
                className="bg-white rounded-xl shadow-sm p-4"
              >
                {/* Product information */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <img
                    src={productImage}
                    alt={productTitle}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = noImage;
                    }}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg object-cover bg-gray-100 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 mb-1">
                      Bid #{index + 1}
                    </p>

                    <h3 className="font-bold text-gray-800 text-base sm:text-lg break-words">
                      {productTitle}
                    </h3>

                    <p className="text-green-600 font-bold mt-2">
                      ${myBid.bid_price}
                    </p>

                    <span className="badge badge-warning badge-sm mt-2">
                      {myBid.status}
                    </span>
                  </div>
                </div>

                {/* Seller information */}
                <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-200">
                  <div className="w-11 h-11 rounded-full border-2 border-yellow-400 flex items-center justify-center shrink-0 overflow-hidden">
                    {sellerImage ? (
                      <img
                        src={sellerImage}
                        alt={sellerName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaUser className="text-xl text-gray-400" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold text-gray-800 break-words">
                      {sellerName}
                    </p>

                    <p className="text-xs text-gray-500 break-all">
                      {sellerEmail}
                    </p>
                  </div>
                </div>

                {/* Remove bid */}
                <button
                  onClick={() => handleRemoveBid(myBid._id)}
                  className="btn btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white w-full btn-sm sm:btn-md mt-4"
                >
                  Remove Bid
                </button>
              </div>
            );
          })}

          {myBids.length === 0 && (
            <div className="bg-white rounded-xl p-8 text-center text-gray-500">
              You haven't placed any bids yet.
            </div>
          )}
        </div>

        {/* ================================= */}
        {/* TABLET / DESKTOP BID TABLE */}
        {/* ================================= */}

        <div className="hidden lg:block overflow-x-auto mt-4 rounded-lg">
          <table className="table table-fixed w-full bg-white">
            <colgroup>
              <col style={{ width: "8%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "27%" }} />
              <col style={{ width: "13%" }} />
              <col style={{ width: "13%" }} />
              <col style={{ width: "14%" }} />
            </colgroup>

            <thead>
              <tr>
                <th>SL No.</th>
                <th>Product</th>
                <th>Seller</th>
                <th>Bid Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {visibleBids.map((myBid, index) => {
                const productImage =
                  myBid.product_image || myBid.image || noImage;

                const productTitle =
                  myBid.product_title || myBid.title || "Product";

                const sellerName = myBid.seller_name || "Seller";

                const sellerEmail = myBid.seller_email || "";

                const sellerImage = myBid.seller_image || "";

                return (
                  <tr key={myBid._id}>
                    {/* Serial number */}
                    <td className="text-center">{index + 1}</td>

                    {/* Product */}
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar shrink-0">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={productImage}
                              alt={productTitle}
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = noImage;
                              }}
                            />
                          </div>
                        </div>

                        <div className="min-w-0">
                          <div className="font-bold truncate">
                            {productTitle}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Seller */}
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar shrink-0">
                          <div className="h-12 w-12 rounded-full border-2 border-yellow-400 flex items-center justify-center overflow-hidden">
                            {sellerImage ? (
                              <img
                                src={sellerImage}
                                alt={sellerName}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <FaUser className="text-xl text-gray-400" />
                            )}
                          </div>
                        </div>

                        <div className="min-w-0">
                          <div className="font-bold truncate">{sellerName}</div>

                          <div className="text-xs opacity-50 truncate">
                            {sellerEmail}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Bid price */}
                    <td>
                      <span className="badge badge-ghost badge-sm">
                        ${myBid.bid_price}
                      </span>
                    </td>

                    {/* Status */}
                    <td>
                      <span className="badge badge-warning">
                        {myBid.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td>
                      <button
                        onClick={() => handleRemoveBid(myBid._id)}
                        className="btn btn-sm btn-outline text-red-500 border-red-500"
                      >
                        Remove Bid
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* See more and see less */}
        {myBids.length > 7 && (
          <div className="flex justify-center mt-6">
            {showAllBids ? (
              <button
                onClick={handleSeeMore}
                className="btn btn-active btn-warning btn-sm sm:btn-md"
              >
                See Less <FaArrowLeft />
              </button>
            ) : (
              <button
                onClick={handleSeeMore}
                className="btn btn-active btn-warning btn-sm sm:btn-md"
              >
                See More <FaArrowRight />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBids;
