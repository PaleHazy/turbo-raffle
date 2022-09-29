import { useEffect, useState } from "react";
import { Button } from "ui";

export default function Web() {
  const [users, setUsers] = useState<any[]>([]);
  useEffect(() => {

  }, []);
  return (
    <div>
      <h1>Web</h1>
      <Button />
    </div>
  );
}
