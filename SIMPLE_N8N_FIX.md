# ⚡ SUPER SIMPLE FIX - n8n Expression Not Working

## The Problem
Your chatbot shows: `={{ $json.text }}`

## The Fix (Choose ONE method)

---

## 🎯 Method 1: Use Field Mode (EASIEST)

### In your n8n "Respond to Webhook" node:

1. **Response Mode:** Select `Using Fields Below`

2. **Click "Add Field"**

3. **Set the field:**
   - **Name:** Type `reply`
   - **Value:** Look for a small icon next to the input (might be `=` or `fx`)
   - **Click that icon** to enable expression mode
   - **Type:** `$json.text` (no quotes, no brackets)

4. **Save**

---

## 🎯 Method 2: Add a Set Node (MOST RELIABLE)

### Add a new node between "Basic LLM Chain" and "Respond to Webhook":

**Your workflow should be:**
```
Webhook → Basic LLM Chain → Set → Respond to Webhook
```

### Configure the Set node:

1. **Add a "Set" node** (search for "Set" in n8n)
2. **Click "Add Field"**
3. **Set:**
   - Name: `reply`
   - Value: Enable expression mode (click the `=` icon)
   - Value: `$json.text`
4. **Save**

### Configure Respond to Webhook:

1. **Response Mode:** `Using Fields Below`
2. **Click "Add Field"**
3. **Set:**
   - Name: `reply`
   - Value: Enable expression mode
   - Value: `$json.reply`
4. **Save**

---

## 🎯 Method 3: Use JSON with Correct Syntax

### In "Respond to Webhook" node:

1. **Make sure you're in JSON mode**
2. **Look for "Expression" toggle** - make sure it's ON
3. **Enter this:**

```json
{
  "reply": {{ $json.text }}
}
```

**Note:** No quotes around `{{ $json.text }}` and no `=` sign!

---

## 🧪 Test It

After making changes:

```bash
node test-your-webhook.js
```

Should show:
```
✅ SUCCESS! Found "reply" field
💬 Reply: Hello! Welcome to Tushar's portfolio...
```

NOT:
```
💬 Reply: ={{ $json.text }}
```

---

## 🔍 How to Find Expression Mode

In n8n, look for one of these:

- A toggle switch labeled "Expression"
- A small `=` icon next to input fields
- An `fx` icon next to input fields
- A dropdown with "Fixed" / "Expression" options

**Click it to enable expression mode!**

---

## ✅ Quick Checklist

- [ ] Response Mode is "Using Fields Below" (not "Using JSON")
- [ ] Expression mode is ENABLED (look for the `=` or `fx` icon)
- [ ] Value is `$json.text` (no quotes, no `={{}}`)
- [ ] Field name is `reply`
- [ ] Workflow is saved
- [ ] Test shows actual text, not the expression

---

## 💡 Why This Happens

When you put `"={{ $json.text }}"` in quotes in JSON mode, n8n treats it as a literal string.

You need to either:
1. Use Field mode with expression enabled, OR
2. Use JSON mode without quotes: `{{ $json.text }}`

---

## 🆘 Still Not Working?

Try the Set node method (Method 2). It's the most reliable because:
1. Set node normalizes the data
2. You can see the output of Set node to verify it works
3. Respond to Webhook just passes through the data

---

## 📸 What You Should See

### In n8n after execution:

**Set node output (if using Method 2):**
```json
{
  "reply": "Hello! Welcome to Tushar's portfolio..."
}
```

**Respond to Webhook output:**
```json
{
  "reply": "Hello! Welcome to Tushar's portfolio..."
}
```

### In your website chatbot:
```
Hello! Welcome to Tushar's portfolio. How can I assist you today?
```

NOT:
```
={{ $json.text }}
```

---

**Try Method 1 first (Field mode). If that doesn't work, use Method 2 (Set node).** 🚀
