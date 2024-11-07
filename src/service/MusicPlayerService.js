export const fetchAlbumData = async ( ) => {
    try {
     
      const headers = new Headers();
  
      const options = {
        method: "GET",
        headers: headers,
      };
  
      const response = await fetch(
        `https://www.theaudiodb.com/api/v1/json/2/mvid.php?i=112024`,
        options
      );
      if (!response.ok) {
        throw new Error("Network response was not ok" + response.statusText);
      }
  
      return response.json();
    } catch (error) {
      // console.error("Error fetching user data: ", error);
      console.log("Error fetching user data: ", error);
    }
  };