# Free AI API Keys Setup Guide

This application supports multiple free AI APIs with automatic fallback. If one API fails, it automatically tries the next one.

## 🎯 Priority Order: Dify → Groq → Hugging Face → Local

---

## 1. Dify API (Primary - Already Configured ✅)

**Status:** Already configured with key `app-5zy9aBBpXmSpw2Flz02CeDG3`

**Get your free key:**
1. Go to https://cloud.dify.ai/
2. Sign up for free account
3. Create a new app (Chat type)
4. Get your API key from App Settings → API Access
5. Set environment variable: `DIFY_API_KEY=your-key`

**Features:**
- ✅ Conversation memory
- ✅ File/image upload support
- ✅ Free tier available

---

## 2. Groq API (Recommended - Fastest ⚡)

**Get your free key:**
1. Go to https://console.groq.com/
2. Sign up for free account
3. Navigate to API Keys section
4. Create new API key
5. Set environment variable: `GROQ_API_KEY=your-key`

**Models available:**
- `llama-3.3-70b-versatile` (default)
- `mixtral-8x7b-32768`
- `gemma-7b-it`

**Free tier limits:**
- Very generous: ~10-20k tokens per day
- Super fast response time (<1 second)

**Add to your `.env` file:**
```bash
GROQ_API_KEY=gsk_...
```

---

## 3. Hugging Face API (Free Alternative 🤗)

**Get your free key:**
1. Go to https://huggingface.co/
2. Sign up for free account
3. Go to Settings → Access Tokens
4. Create new token (Read permissions)
5. Set environment variable: `HF_API_KEY=your-token`

**Models available:**
- `mistralai/Mistral-7B-Instruct-v0.2` (default)
- `meta-llama/Llama-2-7b-chat-hf`
- `google/gemma-7b`

**Free tier limits:**
- ~1000 requests per day
- Good quality responses

**Add to your `.env` file:**
```bash
HF_API_KEY=hf_...
```

---

## 🔧 How to Add API Keys

### Option 1: Environment Variables (Recommended for Production)

Create or edit `.env` file in your project root:

```bash
# Dify API (already configured)
DIFY_API_KEY=app-5zy9aBBpXmSpw2Flz02CeDG3

# Groq API (get from https://console.groq.com/)
GROQ_API_KEY=gsk_your-groq-key-here

# Hugging Face API (get from https://huggingface.co/settings/tokens)
HF_API_KEY=hf_your-hf-key-here
```

### Option 2: Railway Environment Variables

1. Go to your Railway project
2. Select your service
3. Go to Variables tab
4. Add the following variables:
   - `DIFY_API_KEY`
   - `GROQ_API_KEY`
   - `HF_API_KEY`

### Option 3: Direct Edit in Code (Not Recommended)

Edit `routes/chat.js` and replace the empty strings:
```javascript
const GROQ_API_KEY = process.env.GROQ_API_KEY || 'gsk_your-actual-key';
const HF_API_KEY = process.env.HF_API_KEY || 'hf_your-actual-token';
```

---

## 📊 How Fallback Works

The system tries APIs in order:

1. **Dify API** - If configured, tries first
   - ✅ Success: Returns response
   - ❌ Fail: Tries next API

2. **Groq API** - If Dify fails
   - ✅ Success: Returns response
   - ❌ Fail: Tries next API

3. **Hugging Face** - If Groq fails
   - ✅ Success: Returns response
   - ❌ Fail: Uses local responses

4. **Local Fallback** - If all APIs fail
   - Simple pre-programmed responses
   - Always works offline

**Console logs show which API is being used:**
```
Attempting Dify API...
Dify API failed: API key not configured
Attempting Groq API...
✅ Success with Groq
```

---

## 💡 Quick Start (Recommended Setup)

### Minimum Setup (Dify only - Already done ✅)
Your app already works with Dify API! No action needed.

### Best Free Setup (Dify + Groq)
1. Get Groq key from https://console.groq.com/ (2 minutes)
2. Add `GROQ_API_KEY` to environment variables
3. Restart application

### Maximum Reliability (All three)
1. Get Groq key from https://console.groq.com/
2. Get HF key from https://huggingface.co/settings/tokens
3. Add both to environment variables
4. Restart application

---

## 🔍 Testing Your Setup

After adding keys, check console logs:

**Working correctly:**
```
Attempting Dify API...
✅ Success with Dify
```

**Fallback activated:**
```
Attempting Dify API...
Dify API failed: Rate limit exceeded
Attempting Groq API...
✅ Success with Groq
```

**All APIs failed:**
```
Attempting Dify API...
Dify API failed: API key not configured
Attempting Groq API...
Groq API failed: API key not configured
Attempting Hugging Face API...
Hugging Face API failed: API key not configured
All AI APIs failed: Dify: ..., Groq: ..., HF: ...
Using local fallback responses
```

---

## 📝 Notes

- **You don't need all keys** - Even one API is enough
- **Keys are optional** - App works with local responses if no API configured
- **No costs** - All recommended APIs have free tiers
- **No credit card required** - For Groq and Hugging Face
- **Automatic fallback** - System never crashes, always responds

---

## 🆘 Troubleshooting

**Problem:** "API key not configured"
**Solution:** Add the API key to environment variables

**Problem:** "Rate limit exceeded"
**Solution:** Add more API keys as backups (Groq recommended)

**Problem:** "Timeout"
**Solution:** Check your internet connection, try again

**Problem:** "Cannot find module 'axios'"
**Solution:** Run `npm install` to install dependencies

---

## 🚀 Ready to Use!

Your application is already configured with Dify API and will work immediately.

For better reliability and speed, add Groq API key (free, 2 minutes setup):

1. Go to https://console.groq.com/
2. Sign up and get API key
3. Add to environment: `GROQ_API_KEY=gsk_...`
4. Restart app

Done! 🎉
