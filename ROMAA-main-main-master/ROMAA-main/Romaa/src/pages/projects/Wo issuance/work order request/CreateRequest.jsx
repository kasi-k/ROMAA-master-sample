import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Modal from "../../../../components/Modal";
import { InputField } from "../../../../components/InputField";
import { HiOutlineInformationCircle } from "react-icons/hi2";

const schema = yup.object().shape({
  workordername: yup.string().required("Work order name is required"),
  contactorcategory: yup.string().required("Contractor category is required"),
  worktype: yup.string().required("Work type is required"),
  units: yup.string().required("Units are required"),
  date: yup.date().typeError("Date is required").required("Date is required"),
});

const CreateRequest = ({ onclose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    data;
    onclose();
  };

  return (
    <>
      <Modal
        title="Create Request"
        icon={<HiOutlineInformationCircle />}
        widthClassName="lg:w-[420px] md:w-[420px] w-96"
        onclose={onclose}
        child={
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 px-6 py-6">
                <div className="space-y-4">
                  <InputField
                    label="Work order name"
                    name="workordername"
                    register={register}
                    errors={errors}
                    placeholder="Enter work order name"
                  />

                  <InputField
                    label="Contractor Category"
                    name="contactorcategory"
                    register={register}
                    errors={errors}
                    placeholder="Enter contractor category"
                  />
                  <InputField
                    label="Work Type"
                    name="worktype"
                    register={register}
                    errors={errors}
                    placeholder="Enter work type"
                  />
                  <InputField
                    label="Units"
                    name="units"
                    register={register}
                    errors={errors}
                    placeholder="Enter units"
                  />

                  <InputField
                    label="Date"
                    name="date"
                    type="date"
                    register={register}
                    errors={errors}
                  />
                </div>
              </div>
              <div className="mx-5 text-xs flex lg:justify-end md:justify-center justify-center gap-2 mb-4">
                <button
                  type="button"
                  onClick={onclose}
                  className="cursor-pointer border dark:border-white dark:text-white border-darkest-blue text-darkest-blue px-6 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer px-6 bg-darkest-blue text-white rounded"
                >
                  Create Request
                </button>
              </div>
            </form>
          </>
        }
      />
    </>
  );
};

export default CreateRequest;
