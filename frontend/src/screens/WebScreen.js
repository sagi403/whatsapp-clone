import ContactList from "../components/ContactList";
import MyMessage from "../components/MyMessage";

const WebScreen = () => {
  return (
    <>
      <div class="container mx-auto h-screen">
        <div class="flex h-full">
          <div class="w-1/4 bg-gray-200 p-4">
            <ul class="list-none p-0">
              <ContactList />
              <ContactList />
              <ContactList />
              <ContactList />
            </ul>
          </div>
          <div class="w-3/4 p-4">
            <div class="flex flex-col">
              {/* User headline */}
              <div class="flex mb-4">
                <img
                  src="https://via.placeholder.com/50x50"
                  alt="Sender Avatar"
                  class="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <p class="font-medium">John Doe</p>
                  <p class="text-sm text-gray-500">Today, 12:00 PM</p>
                </div>
              </div>
              {/* Chat */}
              {/* <div class="h-64 overflow-auto bg-lime-50"> */}
              <MyMessage />
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WebScreen;
