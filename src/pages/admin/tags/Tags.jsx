import React, { useState, useEffect } from "react";
import Header from "@/components/common/Header";
import { getAllTags } from "@/api/admin";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";

export default function Tags() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await getAllTags();
        setTags(response.data);
      } catch (error) {
        toast.error("Error fetching tags");
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  return (
    <>
      <Header
        title="Tags"
        buttons={[
          {
            text: "Add Tag",
            link: "create",
          },
        ]}
      />
      <div className="row">
        <div className="col-8 mt-4 mx-auto">
          <div className="table-responsive shadow rounded">
            <table className="table table-center mx-auto bg-white mb-0">
              <thead>
                <tr>
                  <th className="border-bottom p-3 col-2">Sl No.</th>
                  <th className="border-bottom p-3 col-4">Name</th>
                  <th className="border-bottom p-3 col-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {tags.map((tag, index) => (
                  <tr key={tag._id}>
                    <th className="p-3 col-2">{index + 1}</th>
                    <td className="p-3 col-4">{tag.tagName}</td>
                    <td className="p-3 col-2">
                      <button className="btn btn-danger"><MdDelete /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
