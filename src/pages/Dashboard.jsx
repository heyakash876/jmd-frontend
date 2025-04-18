// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Container,
//   Paper,
//   Typography,
//   Box,
//   CircularProgress,
//   Button,
//   Avatar,
//   Divider,
// } from '@mui/material';
// import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
// import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
// import TravelExploreIcon from '@mui/icons-material/TravelExplore';
// import LogoutIcon from '@mui/icons-material/Logout';

// const Dashboard = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();
//   const BASE_URL = process.env.REACT_APP_API_BASE_URL;

//   useEffect(() => {
//     const fetchUser = async () => {
//       const storedUser = localStorage.getItem('user');
//       if (!storedUser) {
//         navigate('/');
//         return;
//       }

//       const parsedUser = JSON.parse(storedUser);

//       try {
//         const res = await fetch(`${BASE_URL}/api/auth/user/${parsedUser._id}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });

//         const updatedUser = await res.json();
//         setUser(updatedUser);
//         localStorage.setItem('user', JSON.stringify(updatedUser));
//       } catch (err) {
//         console.error('Failed to fetch user', err);
//         navigate('/');
//       }
//     };

//     fetchUser();
//   }, [navigate]);
// console.log(user);
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     navigate('/');
//   };

//   if (!user) {
//     return (
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           minHeight: '100vh',
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         background: `linear-gradient(135deg, #e3f2fd, #fffde7)`,
//         minHeight: '100vh',
//         py: 6,
//       }}
//     >
//       <Container maxWidth="md">
//         <Paper elevation={6} sx={{ p: 4, borderRadius: 4, position: 'relative' }}>
//           {/* Top Bar */}
//           <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
//             <Box display="flex" alignItems="center">
//               <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
//                 <TravelExploreIcon />
//               </Avatar>
//               <Typography variant="h5" fontWeight="bold">
//                 JMD Overseas Dashboard
//               </Typography>
//             </Box>
//             <Button
//               variant="outlined"
//               color="error"
//               size="small"
//               startIcon={<LogoutIcon />}
//               onClick={handleLogout}
//             >
//               Sign Out
//             </Button>
//           </Box>

//           <Divider sx={{ mb: 3 }} />

//           <Typography variant="h6" mb={2}>
//             Welcome, <span style={{ color: '#1976d2' }}>{user.name}</span> 👋
//           </Typography>

//           <Typography variant="body1" gutterBottom>
//             <strong>Passport Number:</strong> {user.passportNumber}
//           </Typography>

//           <Typography variant="body1" gutterBottom>
//             <strong>Application Status:</strong>{' '}
//             <span style={{ color: user.status === 'Approved' ? 'green' : '#f57c00' }}>
//               {user.status}
//             </span>
//           </Typography>

//           {user.visaURL ? (
//             <Box mt={3} textAlign="center">
//               <Button
//                 variant="contained"
//                 color="success"
//                 startIcon={<CloudDownloadIcon />}
//                 href={`${BASE_URL}/${user.visaURL}`}
//                 target="_blank"
//               >
//                 Download Visa
//               </Button>
//             </Box>
//           ) : (
//             <Typography color="textSecondary" sx={{ mt: 3, textAlign: 'center' }}>
//               Visa not available yet. Please check back later.
//             </Typography>
//           )}

//           <Divider sx={{ mt: 4, mb: 2 }} />

//           <Typography variant="body2" color="text.secondary" align="center">
//             ✈️ Safe travels and best wishes on your journey! If you need help, contact our support team at{' '}
//             <strong>help@jmdoverseas.com</strong>
//           </Typography>
//         </Paper>
//       </Container>
//     </Box>
//   );
// };

// export default Dashboard;



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Button,
  Avatar,
  Divider,
  Grid,
  Chip,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import LogoutIcon from '@mui/icons-material/Logout';
import BadgeIcon from '@mui/icons-material/Badge';
import PersonIcon from '@mui/icons-material/Person';
import FlagIcon from '@mui/icons-material/Flag';
import CakeIcon from '@mui/icons-material/Cake';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        navigate('/');
        return;
      }

      const parsedUser = JSON.parse(storedUser);

      try {
        const res = await fetch(`${BASE_URL}/api/auth/user/${parsedUser._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const updatedUser = await res.json();
        console.log('Fetched User:', updatedUser);

        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } catch (err) {
        console.error('Failed to fetch user', err);
        navigate('/');
      }
     
    };

    fetchUser();
    

  }, [navigate]);
  
  console.log(user);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ background: `linear-gradient(to right, #f1f8e9, #e3f2fd)`, minHeight: '100vh', py: 6 }}>
      <Container maxWidth="md">
        <Paper elevation={6} sx={{ p: 4, borderRadius: 4 }}>
          {/* Header */}
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
            <Box display="flex" alignItems="center">
              <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                <TravelExploreIcon />
              </Avatar>
              <Typography variant="h5" fontWeight="bold">
                JMD Overseas Dashboard
              </Typography>
            </Box>
            <Button
              variant="outlined"
              color="error"
              size="small"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
            >
              Sign Out
            </Button>
          </Box>

          {/* Welcome Message */}
          <Typography variant="h6" gutterBottom>
            Welcome, <span style={{ color: '#1976d2' }}>{user.name+ " "+ user.lastName}</span> 👋
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* User Info Card */}
          <Card elevation={3} sx={{ mb: 3, borderRadius: 3 }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <BadgeIcon color="primary" />
                    <Typography variant="body1">
                      <strong>Passport No:</strong> {user.passportNumber}
                    </Typography>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <FlagIcon color="secondary" />
                    <Typography variant="body1">
                      <strong>Visa Country:</strong> {user.visaCountry || 'N/A'}
                    </Typography>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CakeIcon color="warning" />
                    <Typography variant="body1">
                      <strong>Age:</strong> {user.age}
                    </Typography>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <PhoneAndroidIcon color="success" />
                    <Typography variant="body1">
                      <strong>Phone:</strong> {user.phoneNumber}
                    </Typography>
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <PersonIcon color="error" />
                    <Typography variant="body1">
                      <strong>Father's Name:</strong> {user.fatherName || 'N/A'}
                    </Typography>
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <FlightTakeoffIcon />
                    <Typography variant="body1">
                      <strong>Status:</strong>{' '}
                      <Chip
                        label={user.status}
                        color={user.status === 'Approved' ? 'success' : 'warning'}
                        size="small"
                        sx={{ fontWeight: 'bold' }}
                      />
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Visa Download Section */}
          {user.visaURL ? (
            <Box textAlign="center" my={3}>
              <Button
                variant="contained"
                color="success"
                startIcon={<CloudDownloadIcon />}
                href={`${BASE_URL}/${user.visaURL}`}
                target="_blank"
              >
                Download Visa
              </Button>
            </Box>
          ) : (
            <Typography color="text.secondary" align="center" mt={3}>
              Visa not available yet. Please check back later.
            </Typography>
          )}

          {/* Footer Message */}
          <Divider sx={{ mt: 4, mb: 2 }} />
          <Typography variant="body2" color="text.secondary" align="center">
            ✈️ Safe travels! If you need help, contact us at{' '}
            <strong>help@jmdoverseas.com</strong>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Dashboard;

