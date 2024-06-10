import React from 'react'
import Header from "@/components/common/Header";
export default function Explore() {
  return (
    <>
      <Header
        title="Explores"
        buttons={[
          {
            text: "Add Explore",
            link: "create",
          },
        ]}
      />
      <h1>Explores</h1>
    </>
  )
}
