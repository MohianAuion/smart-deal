import React, { use, useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaUser } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

const MyBids = () => {
  const { user } = use(AuthContext);
  const [myBids, setMyBids] = useState([]);
  const[showAllBids, setShowAllBids]=useState(false);
  const visibleBids= showAllBids ? myBids : myBids.slice(0, 10);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/bids?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("my bids", data);
          const sortBidsPrice=[...data].sort((a, b)=>b.bid_price - a.bid_price)
          setMyBids(sortBidsPrice);
        });
    }
  }, [user?.email]);

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
        fetch(`http://localhost:3000/bids/${_id}`, {
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

    console.log("bid deleted");
  };

  const handleSeeMore=()=>{
    console.log('see more bids')
    setShowAllBids(!showAllBids)
  }
  return (
    <div className="bg-gray-100">
      <div className="w-10/12 mx-auto py-14">
        <h2 className="text-center text-4xl font-bold">
          My Bids : <span className="text-yellow-400">{myBids.length}</span>
        </h2>

        {/* table */}
        <div className="overflow-x-auto mt-4">
          <table className="table table-fixed w-full bg-white">
            {/*column widths */}
            <colgroup>
              <col style={{ width: "8%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "27%" }} />
              <col style={{ width: "13%" }} />
              <col style={{ width: "13%" }} />
              <col style={{ width: "14%" }} />
            </colgroup>

            {/* column head */}
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
              {visibleBids.map((myBid, index) => (
                <tr key={myBid._id}>
                  {/* sl no */}
                  <td className="text-center">{index + 1}</td>

                  {/* product name */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar shrink-0">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src="" alt="product image" />
                        </div>
                      </div>

                      <div className="min-w-0">
                        <div className="font-bold truncate">title</div>
                      </div>
                    </div>
                  </td>

                  {/* seller info */}
                  <td>
                    <div className="flex items-center gap-3">
                      {/* seller image */}
                      <div className="avatar shrink-0">
                        <div className="h-12 w-12 rounded-full border-2 border-yellow-400 flex items-center justify-center">
                          <img
                            src={""}
                            alt="buyer image"
                            className="h-full w-full rounded-full object-cover"
                          />
                          :
                          <FaUser className="text-xl text-gray-400" />
                        </div>
                      </div>

                      <div className="min-w-0">
                        {/* seller name */}
                        <div className="font-bold truncate">
                          mohian ahmed auion
                        </div>
                        {/* seller email */}
                        <div className="text-xs opacity-50 truncate">
                          mohianahmed@gmail.com
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* bid price */}
                  <td>
                    <span className="badge badge-ghost badge-sm">
                      {myBid.bid_price}
                    </span>
                  </td>

                  {/* status */}
                  <td>
                    <button className="badge badge-warning">
                      {myBid.status}
                    </button>
                  </td>

                  {/* actions */}
                  <td>
                    <button
                      onClick={() => handleRemoveBid(myBid._id)}
                      className="btn btn-outline text-red-500 border-red-500"
                    >
                      Remove Bid
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

{/* see more bids and see less */}
     {
        myBids.length > 10 &&  <div className="flex justify-center mt-6">
         {
            showAllBids?  <button onClick={handleSeeMore} className="btn btn-active btn-warning">See Less <FaArrowLeft></FaArrowLeft></button> :  <button onClick={handleSeeMore} className="btn btn-active btn-warning">See More<FaArrowRight></FaArrowRight> </button>
         }
      </div>
     }
      </div>
    </div>
  );
};

export default MyBids;
