import ContactList from "../components/ContactList";
import MyMessage from "../components/MyMessage";
import OtherMessage from "../components/OthersMessage";

const WebScreen = () => {
  return (
    <>
      <div className="container mx-auto h-screen">
        <div className="flex h-full">
          <div className="w-1/4 bg-gray-200 p-4">
            <ul className="list-none p-0">
              <ContactList />
              <ContactList />
              <ContactList />
              <ContactList />
            </ul>
          </div>
          <div className="w-3/4">
            <div className="flex flex-col">
              {/* User headline */}
              <div className="flex p-4">
                <img
                  src="https://via.placeholder.com/50x50"
                  alt="Sender Avatar"
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-gray-500">Today, 12:00 PM</p>
                </div>
              </div>
              {/* Chat */}
              {/* <div className="h-64 overflow-auto bg-lime-50"> */}
              <div className="container mx-auto p-4 bg-orange-50">
                <MyMessage />
                <MyMessage />
                <MyMessage />
                <OtherMessage />
                <OtherMessage />
                <OtherMessage />
                <MyMessage />
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WebScreen;
