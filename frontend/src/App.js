import React, { useState } from "react";
import { Container, TextField, Button, Typography, CircularProgress, Box, Paper, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MicIcon from "@mui/icons-material/Mic";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [open, setOpen] = useState(false);

  const getSentimentEmoji = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case "positive": return "😊";
      case "neutral": return "😐";
      case "negative": return "😡";
      default: return "❓";
    }
  };

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const response = await axios.post("/analyze", { text });
      setSentiment(response.data.sentiment);
      setHistory(prev => [{ text, sentiment: response.data.sentiment }, ...prev].slice(0, 10));
    } catch (error) {
      console.error("Error fetching sentiment:", error);
      setSentiment("Error analyzing text");
    }
    setLoading(false);
  };

  const handleSpeechToText = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();
    recognition.onresult = (event) => {
      setText(event.results[0][0].transcript);
    };
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };
  };

  const downloadHistory = () => {
    if (history.length === 0) return;
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Text,Sentiment\n" + 
      history.map(item => `"${item.text.replace(/"/g, '""')}",${item.sentiment}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sentiment_history.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        color: "white",
      }}
    >
      <Container maxWidth="sm" sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Paper elevation={10} sx={{ padding: 4, borderRadius: 3, backgroundColor: "#ffffffdd", width: "100%" }}>
          <Typography variant="h4" gutterBottom textAlign="center" fontWeight="bold" color="#333">
            Sentiva
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <TextField
              label="Enter your text"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              sx={{
                marginBottom: 3,
                backgroundColor: "#fff",
                borderRadius: 1,
                '& .MuiOutlinedInput-root': { borderRadius: 2 }
              }}
            />
            <IconButton 
              onClick={handleSpeechToText} 
              color="secondary" 
              sx={{ 
                marginBottom: 3, 
                backgroundColor: "#764ba2", 
                color: "white", 
                '&:hover': { backgroundColor: "#5a3e8a" }, 
                width: 50, 
                height: 50 
              }}
            >
              <MicIcon fontSize="large" />
            </IconButton>
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleAnalyze}
            disabled={loading}
            sx={{
              fontSize: "1rem",
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: 2,
              backgroundColor: "#764ba2",
              '&:hover': { backgroundColor: "#5a3e8a" },
            }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Analyze Sentiment"}
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => setOpen(true)}
            sx={{
              marginTop: 2,
              fontSize: "1rem",
              fontWeight: "bold",
              borderRadius: 2,
              color: "#764ba2",
              borderColor: "#764ba2",
              '&:hover': { backgroundColor: "#f3e5f5" },
            }}
          >
            View Previous Records
          </Button>
          {sentiment && (
            <Box mt={3} p={3} borderRadius={2} textAlign="center" bgcolor="#f5f5f5">
              <Typography variant="h6" color="#333">Predicted Sentiment:</Typography>
              <Typography variant="h5" fontWeight="bold" color="#764ba2">
                {sentiment} {getSentimentEmoji(sentiment)}
              </Typography>
            </Box>
          )}
        </Paper>
      </Container>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle display="flex" justifyContent="space-between" alignItems="center">
          Sentiment Analysis History
          <IconButton onClick={downloadHistory}><FileDownloadIcon /></IconButton>
          <IconButton onClick={() => setOpen(false)}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent>
          <List sx={{ maxHeight: "300px", overflowY: "auto" }}>
            {history.length > 0 ? history.map((item, index) => (
              <ListItem key={index} sx={{ backgroundColor: "#f5f5f5", margin: "5px 0", borderRadius: 2, padding: 2 }}>
                <ListItemText
                  primary={<Typography fontWeight="bold" color="#333">{item.text}</Typography>}
                  secondary={<Typography color="#764ba2">Sentiment: {item.sentiment} {getSentimentEmoji(item.sentiment)}</Typography>}
                />
              </ListItem>
            )) : <Typography textAlign="center">No records found</Typography>}
          </List>
        </DialogContent>
      </Dialog>
      <Box component="footer" sx={{ textAlign: "center", padding: 2, backgroundColor: "rgba(0, 0, 0, 0.2)", color: "white" }}>
        <Typography variant="body2">Made with ❤️ by Kunal Singh</Typography>
      </Box>
    </Box>
  );
}

export default App;