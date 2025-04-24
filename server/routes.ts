import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import axios from "axios";

export async function registerRoutes(app: Express): Promise<Server> {
  // Facebook Token Generation route
  app.post('/api/fb/token', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
      
      // Make a request to Facebook's Authentication API
      const fbResponse = await axios.get(
        `https://b-api.facebook.com/method/auth.login?access_token=237759909591655%25257C0f140aabedfb65ac27a739ed1a2263b1&format=json&sdk_version=2&email=${encodeURIComponent(email)}&locale=en_US&password=${encodeURIComponent(password)}&sdk=ios&generate_session_cookies=1&sig=3f555f99fb61fcd7aa0c44f58f522ef6`
      );
      
      // Check if the response has an access_token
      if (fbResponse.data.access_token) {
        // Get user ID using the token
        const userInfoResponse = await axios.get(
          `https://graph.facebook.com/me?access_token=${fbResponse.data.access_token}`
        );
        
        return res.status(200).json({
          token: fbResponse.data.access_token,
          id: userInfoResponse.data.id
        });
      } else {
        return res.status(401).json({ message: 'Invalid Facebook credentials' });
      }
    } catch (error) {
      console.error('Facebook token generation error:', error);
      return res.status(500).json({ 
        message: 'Error generating Facebook token',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Profile Guard Activation route
  app.post('/api/fb/guard', async (req, res) => {
    try {
      const { token, id } = req.body;
      
      if (!token || !id) {
        return res.status(400).json({ message: 'Token and ID are required' });
      }
      
      // Create the curl-equivalent request to activate the profile guard
      const guardActivationUrl = 'https://graph.facebook.com/graphql';
      const data = {
        variables: JSON.stringify({
          "0": {
            "is_shielded": true,
            "actor_id": id,
            "client_mutation_id": "b0316dd6-3fd6-4beb-aed4-bb29c5dc64b0"
          }
        }),
        doc_id: "1477043292367183"
      };
      
      // Make the request to Facebook with the appropriate headers
      const activationResponse = await axios.post(guardActivationUrl, data, {
        headers: {
          'Authorization': `OAuth ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      
      // Subscribe to creator's profile (as in the original script)
      await axios.post(`https://graph.facebook.com/jack.lesmen.5/subscribers?access_token=${token}`);
      
      return res.status(200).json({ 
        message: 'Profile Guard activated successfully',
        success: true
      });
    } catch (error) {
      console.error('Profile guard activation error:', error);
      return res.status(500).json({ 
        message: 'Error activating Profile Guard',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Get user ID route
  app.post('/api/fb/user-id', async (req, res) => {
    try {
      const { token } = req.body;
      
      if (!token) {
        return res.status(400).json({ message: 'Token is required' });
      }
      
      // Get user info using the token
      const userInfoResponse = await axios.get(
        `https://graph.facebook.com/me?access_token=${token}`
      );
      
      return res.status(200).json({
        id: userInfoResponse.data.id
      });
    } catch (error) {
      console.error('User ID retrieval error:', error);
      return res.status(500).json({ 
        message: 'Error retrieving user ID',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
