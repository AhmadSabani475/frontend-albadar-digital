import CreateUserDialog from "@/components/molecules/CreateUserDialog";



const DataUsersPage = () => {
    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Data User</h1>
                <CreateUserDialog />
            </div>

        </div>
    )
}
export default DataUsersPage;