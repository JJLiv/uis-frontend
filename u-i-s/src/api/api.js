import axios from "axios";


const BASE_URL = "http://localhost:3001";

class UpInSportsApi {   

  static token;
    
    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call to local server:", endpoint, data, method);
    
        const url = `${BASE_URL}/${endpoint}/`;
        const headers = { Authorization: `Bearer ${UpInSportsApi.token}` };
        const params = (method === "get")
            ? data
            : {};
    
        try {
          return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
          console.error("API Error:", err.response);
          let message = err.response.data.error.message;
          throw Array.isArray(message) ? message : [message];
        }
      }


      // static async establishConnection() {
      //   const res = await this.request("/");
      //   return {res: "success", res};
      // };


      static async getAllTeams({}) {
        let res = await this.request("teams", {});
        console.debug("frontend api call for all teams:", res);
        return res.teams;
      }
      static async getTeam(code) {
        let res = await this.request(`teams/${code}`);
        return res.team;
      }

      static async getAllPlayers({}) {
        let res = await this.request("players", {});
        console.debug("api call to backend for all players:", res);
        return res.players;
      }

      static async getPlayer(id) {
        let res = await this.request(`players/${id}`);
        return res.player;
      }

      // static async getStatsForPlayer(player_id) {
        
      // }

      // static async getGames() {

      // }


      static async signup(data) {
        let res = await this.request(`auth/signup`, data, "post");
        return res.token;
      }

      static async login(data) {
        let res = await this.request("auth/token", data, "post");
        return res.token;
      }

      static async saveProfile(username, data) {
        let res = await this.request(`users/${username}`, data, "patch");
        return res.user;
      }

    

};

UpInSportsApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default UpInSportsApi;