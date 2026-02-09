"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { getTranslation } from "@/locale/common";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export function GetQuotesDialog({ locale = "mn" }: { locale?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [open, setOpen] = useState(false); 

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    emailjs
      .sendForm(
        "service_zs4ayto",    // EmailJS service ID
        "template_pb1yhpd",   // EmailJS template ID
        formRef.current!,
        "aWIGlzJLIsNyO0Hfz"   // EmailJS public key
      )
      .then(
        () => {
          formRef.current?.reset();
          setFileName(null);
          toast.success(getTranslation(locale, "success_msg"));
          setOpen(false);
          
        },
        (error) => {
          console.error("Failed to send form", error);
          toast.error(getTranslation(locale, "error_msg"));

        }
      )
      .finally(() => setSending(false));
  };

  return (
    <>
      <Toaster position="top-center" />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
           className="relative bg-gradient text-black h-[40px] px-6 rounded-md font-semibold hover:scale-105 transition-transform hover:shadow z-50 overflow-hidden hover:transition-all duration-500 ease-in-out"
           size="default"
        >
         {getTranslation(locale, "get_quotes")}
         </Button>
        </DialogTrigger> 

        <DialogContent className="bg-white p-6 rounded-xl shadow-lg max-w-lg mx-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-800">
              {getTranslation(locale, "quote_form_title")}
            </DialogTitle>
          </DialogHeader>

          <form ref={formRef} onSubmit={sendEmail} className="space-y-4 mt-4">
            <input
              type="text"
              name="user_name"
              placeholder={getTranslation(locale, "info_placeholder")}
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
            <input
              type="email"
              name="user_email"
              placeholder={getTranslation(locale, "email_placeholder")}
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
            <input
              type="tel"
              name="user_phone"
              placeholder={getTranslation(locale, "phone_placeholder")}
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
            <input
              type="text"
              name="from_location"
              placeholder={getTranslation(locale, "from_placeholder")}
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
            <input
              type="text"
              name="to_location"
              placeholder={getTranslation(locale, "to_placeholder")}
              className="w-full border px-4 py-2 rounded-lg"
              required
            />

            <select
              name="transport_type"
              className="w-full border px-4 py-2 rounded-lg bg-yellow-100"
              required
            >
              <option value="">{getTranslation(locale, "transport_select")}</option>
              <option value="Ачаа тээвэр">{getTranslation(locale, "air_freight")}</option>
              <option value="Зорчигч тээвэр">{getTranslation(locale, "groupage_freight")}</option>
              <option value="Олон улсын тээвэр">{getTranslation(locale, "full_truck")}</option>
              <option value="Дотоодын тээвэр">{getTranslation(locale, "container")}</option>
            </select>

            {/* File Upload */}
            <div className="w-full text-center">
              <label
                htmlFor="file-upload"
                className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium py-2 px-6 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-all"
              >
                📎 {getTranslation(locale, "attach_file")}
              </label>
              <input
                id="file-upload"
                type="file"
                name="file"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setFileName(e.target.files[0].name);
                  } else {
                    setFileName(null);
                  }
                }}
              />
              {fileName && (
                <p className="mt-2 text-sm text-gray-700 truncate">📄 {fileName}</p>
              )}
            </div>

            <textarea
              name="message"
              placeholder={getTranslation(locale, "additional_info")}
              className="w-full border px-4 py-2 rounded-lg"
              rows={4}
              required
            />

            <Button
              type="submit"
              className="bg-blue-500 text-white font-semibold w-full py-2 rounded-lg hover:bg-blue-600 transition"
              disabled={sending}
            >
              {sending ? getTranslation(locale, "sending") : getTranslation(locale, "send")}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}









// "use client";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { useRef, useState } from "react";
// import emailjs from "@emailjs/browser";

// export function GetQuotesDialog() {
//   const formRef = useRef<HTMLFormElement>(null);
//   const [sending, setSending] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setSending(true);

//     emailjs
//       .sendForm(
//         "service_zs4ayto",    //  YOUR_SERVICE_ID
//         "template_pb1yhpd",   //  YOUR_TEMPLATE_ID
//         formRef.current!,
//         "aWIGlzJLIsNyO0Hfz"     //  YOUR_PUBLIC_KEY
//       )
//       .then(
//         () => {
//           setSuccess(true);
//           formRef.current?.reset();
//         },
//         (error) => {
//           console.error("Failed to send form", error);
//         }
//       )
//       .finally(() => setSending(false));
//   };

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button
//           className="relative bg-gradient text-black h-[40px] px-6 rounded-md font-semibold hover:scale-105 transition-transform hover:shadow z-50 overflow-hidden hover:transition-all duration-500 ease-in-out"
//           size="default"
//         >
//         Үнийн санал авах
//         </Button>

//          {/* <Button
//               className="relative bg-gradient text-black w-fit  font-semibold text-md hover:scale-105 transition-transform hover:shadow z-50 overflow-hidden hover:transition-all duration-500 ease-in-out mt-10"
//               size="lg"
//             >
//               Үнийн санал авах
//          </Button> */}

//         {/* <Button
//           className="bg-[#06B6D4] text-white h-[40px] px-6 rounded-md font-medium hover:opacity-90 transition"
//           size="default"
//         >
//         Үнийн санал авах
//         </Button> */}

//       </DialogTrigger>
//       <DialogContent className="bg-white p-6 rounded-lg bg-yellow-300">
//         <DialogHeader>
//           <DialogTitle>Үнийн санал авах маягт</DialogTitle>
//         </DialogHeader>

//         <form ref={formRef} onSubmit={sendEmail} className="space-y-4 mt-4">
//           <input
//             type="text"
//             name="user_name"
//             placeholder="Нэр, Компанийн нэр"
//             className="w-full border px-4 py-2 rounded"
//             required
//           />
//           <input
//             type="email"
//             name="user_email"
//             placeholder="И-мэйл хаяг"
//             className="w-full border px-4 py-2 rounded"
//             required
//           />
//             <input
//             type="tel"
//             name="user_phone"
//             placeholder="Утасны дугаар"
//             className="w-full border px-4 py-2 rounded"
//             required
//           />
//           <input
//             type="text"
//             name="from_location"
//             placeholder="Хаанаас"
//             className="w-full border px-4 py-2 rounded"
//             required
//           />
//           <input
//             type="text"
//             name="to_location"
//             placeholder="Хаашаа"
//             className="w-full border px-4 py-2 rounded"
//             required
//           />
//           {/* Тээврийн төрөл сонгох хэсэг */}
//           <select
//           name="transport_type"
//           // className="w-full border px-4 py-2 rounded"
//           className="w-full border px-4 py-2 rounded"
//           required
//           >
//             <option value="">Тээврийн төрлөө сонгоно уу</option>
//             <option value="Ачаа тээвэр">Агаарын тээвэр</option>
//             <option value="Зорчигч тээвэр">Түүвэр буюу Цуглуулбар ачаа</option>
//             <option value="Олон улсын тээвэр">Бүтэн машин</option>
//             <option value="Дотоодын тээвэр">Контайнер</option>
//           </select>

//           {/* <input
//             type="file"
//             name="file"
//             className="w-full border px-4 py-2 rounded"
//           /> */}
//           <div className="w-full">
//   <label
//     htmlFor="file-upload"
//     className="relative inline-block w-full text-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-2 px-6 rounded-lg shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl"
//   >
//     📎 Файл хавсаргах
//   </label>
//   <input
//     id="file-upload"
//     type="file"
//     name="file"
//     className="hidden"
//   />
// </div>


//           <textarea
//             name="message"
//             placeholder="Та энд нэмэлт мэдээлэл оруулна уу"
//             className="w-full border px-4 py-2 rounded"
//             required
//           />
//           <Button type="submit" className="bg-blue-500 w-full text-white" disabled={sending}>
//             {sending ? "Илгээж байна..." : "Илгээх"}
//           </Button>
//           {success && <p className="text-green-600">Амжилттай илгээгдлээ!</p>}
          
//         </form>
//       </DialogContent>

//     </Dialog>
//   );
// }