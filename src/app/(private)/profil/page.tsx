// src/app/(private)/profil/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { 
  Container, 
  Typography, 
  Box, 
  Avatar, 
  Paper, 
  Grid, 
  Button, 
  Divider,
  TextField,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Stack
} from "@mui/material";
import { 
  Edit as EditIcon, 
  LocationOn, 
  Person, 
  Save as SaveIcon,
  Cancel as CancelIcon
} from "@mui/icons-material";
import { fetchUserProfile, updateUserProfile } from "@/app/actions/profile_action";
import { User, Profile, Post, PostImage } from "@prisma/client";

// Define types for our data
type PostWithImages = Post & {
  images: PostImage[];
};

type UserWithProfile = User & {
  profile: Profile | null;
  posts: PostWithImages[];
  _count: {
    followers: number;
    following: number;
    posts: number;
  };
};

export default function ProfilePage() {
  const { data: session } = useSession();
  const [user, setUser] = useState<UserWithProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    bio: "",
    location: "",
    interests: [] as string[],
    avatarUrl: "",
  });
  const [newInterest, setNewInterest] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadUserProfile = async () => {
      if (session?.user?.id) {
        try {
          const userData = await fetchUserProfile(session.user.id);
          setUser(userData as UserWithProfile);
          
          // Initialize edit form with current values
          setEditForm({
            name: userData?.name || "",
            bio: userData?.profile?.bio || "",
            location: userData?.profile?.location || "",
            interests: userData?.profile?.interests || [],
            avatarUrl: userData?.profile?.avatarUrl || userData?.image || "",
          });
        } catch (error) {
          console.error("Error loading profile:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadUserProfile();
  }, [session]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    // Reset form to current values
    if (user) {
      setEditForm({
        name: user.name || "",
        bio: user.profile?.bio || "",
        location: user.profile?.location || "",
        interests: user.profile?.interests || [],
        avatarUrl: user.profile?.avatarUrl || user.image || "",
      });
    }
  };

  const handleSaveProfile = async () => {
    if (!session?.user?.id) return;
    
    setSaving(true);
    try {
      await updateUserProfile(session.user.id, editForm);
      
      // Refresh user data
      const updatedUser = await fetchUserProfile(session.user.id);
      setUser(updatedUser as UserWithProfile);
      setEditMode(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleAddInterest = () => {
    if (newInterest.trim() && !editForm.interests.includes(newInterest.trim())) {
      setEditForm({
        ...editForm,
        interests: [...editForm.interests, newInterest.trim()],
      });
      setNewInterest("");
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setEditForm({
      ...editForm,
      interests: editForm.interests.filter((i: string) => i !== interest),
    });
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!user) {
    return (
      <Container>
        <Typography variant="h5" sx={{ mt: 4 }}>
          User not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            Môj profil
          </Typography>
          {!editMode && (
            <Button 
              variant="outlined" 
              startIcon={<EditIcon />}
              onClick={handleEditClick}
            >
              Upraviť profil
            </Button>
          )}
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar 
              src={editMode ? editForm.avatarUrl : (user.profile?.avatarUrl || user.image || undefined)} 
              alt={user.name || 'User'} 
              sx={{ 
                width: 150, 
                height: 150, 
                mb: 2,
                border: '3px solid',
                borderColor: 'primary.main',
              }}
            >
              {!user.image && <Person sx={{ fontSize: 80 }} />}
            </Avatar>
            
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {user.name || 'User'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
            </Box>

            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6">{user._count.posts}</Typography>
                <Typography variant="body2" color="text.secondary">Príspevky</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6">{user._count.followers}</Typography>
                <Typography variant="body2" color="text.secondary">Sledovatelia</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6">{user._count.following}</Typography>
                <Typography variant="body2" color="text.secondary">Sledujem</Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} md={8}>
            {editMode ? (
              <Box component="form" sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Meno"
                  value={editForm.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditForm({ ...editForm, name: e.target.value })}
                  margin="normal"
                />
                
                <TextField
                  fullWidth
                  label="Bio"
                  value={editForm.bio}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditForm({ ...editForm, bio: e.target.value })}
                  margin="normal"
                  multiline
                  rows={3}
                />
                
                <TextField
                  fullWidth
                  label="Lokalita"
                  value={editForm.location}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditForm({ ...editForm, location: e.target.value })}
                  margin="normal"
                  InputProps={{
                    startAdornment: <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                />
                
                <TextField
                  fullWidth
                  label="URL avatara"
                  value={editForm.avatarUrl}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditForm({ ...editForm, avatarUrl: e.target.value })}
                  margin="normal"
                />
                
                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                  Zaujímavosti
                </Typography>
                
                <Box sx={{ display: 'flex', mb: 1 }}>
                  <TextField
                    fullWidth
                    label="Pridať zaujímavosť"
                    value={newInterest}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewInterest(e.target.value)}
                    onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddInterest();
                      }
                    }}
                  />
                  <Button 
                    variant="contained" 
                    onClick={handleAddInterest}
                    sx={{ ml: 1 }}
                  >
                    Pridať
                  </Button>
                </Box>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {editForm.interests.map((interest) => (
                    <Chip 
                      key={interest} 
                      label={interest} 
                      onDelete={() => handleRemoveInterest(interest)}
                    />
                  ))}
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                  <Button 
                    variant="outlined" 
                    startIcon={<CancelIcon />}
                    onClick={handleCancelEdit}
                    disabled={saving}
                  >
                    Zrušiť
                  </Button>
                  <Button 
                    variant="contained" 
                    startIcon={<SaveIcon />}
                    onClick={handleSaveProfile}
                    disabled={saving}
                  >
                    {saving ? <CircularProgress size={24} /> : 'Uložiť'}
                  </Button>
                </Box>
              </Box>
            ) : (
              <>
                {user.profile?.bio && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      O mne
                    </Typography>
                    <Typography variant="body1">
                      {user.profile.bio}
                    </Typography>
                  </Box>
                )}
                
                {user.profile?.location && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Lokalita
                    </Typography>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                      {user.profile.location}
                    </Typography>
                  </Box>
                )}
                
                {user.profile?.interests && user.profile.interests.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Zaujímavosti
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {user.profile.interests.map((interest) => (
                        <Chip key={interest} label={interest} />
                      ))}
                    </Box>
                  </Box>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Moje príspevky
      </Typography>

      {user.posts.length === 0 ? (
        <Paper elevation={1} sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            Zatiaľ nemáte žiadne príspevky.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {user.posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Paper 
                elevation={2} 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  borderRadius: 2,
                }}
              >
                {post.images.length > 0 && (
                  <Box 
                    sx={{ 
                      position: 'relative',
                      paddingTop: '100%',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      component="img"
                      src={post.images[0].imageUrl}
                      alt={post.caption || 'Post image'}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                )}
                <Box sx={{ p: 2 }}>
                  <Typography variant="body2" noWrap>
                    {post.caption || 'No caption'}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}