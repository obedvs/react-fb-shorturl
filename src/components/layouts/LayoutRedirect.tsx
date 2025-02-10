import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

import Title from "@/components/Title";
import { useFirestore } from "@/hooks/useFirestore";

const LayoutRedirect = () => {
  const { nanoid } = useParams();

  const { searchData } = useFirestore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!nanoid) return;
    searchData(nanoid).then((docSnap) => {
      if (docSnap?.exists()) {
        window.location.href = docSnap.data().origin;
      } else {
        setLoading(false);
      }
    });
  }, [nanoid, searchData]);

  if (loading)
    return (
      <div className="container mx-auto mt-24">
        <Title texto="Redirecting..." />
      </div>
    );

  return (
    <div className="container mx-auto mt-24">
      <Outlet />
    </div>
  );
};

export default LayoutRedirect;
