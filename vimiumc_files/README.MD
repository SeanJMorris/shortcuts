# Notes on Vimium C Configuring

## On Combining Use of Vimium C and Gmail's Default Shortcuts

**NOTE:** The default Gmail shortcut for 'Back to thread list' is 'u', but this conflicts with Vimium C's useful shortcut to scroll up fast. I changed the default [shortcut in Gmail](https://mail.google.com/mail/u/0/#settings/shortcuts) from 'u' to 'i', which is used by neither Gmail nor Vimium C (at least not in Vimium C's analog to normal mode).

It was a pain to figure out how to get the regex to work, which I did on Sunday, 2/22/26. See the spreadsheet for an analysis of the URLs so that shortcuts could be turned off for Vimium C (and, therefore, the default shortcuts could be used from Gmail).

I found that I could get some combinations of regex to work between GPTing it and experimenting with <https://regex101.com/>, but I was never clear about how the syntax of the regex works with Vimium C. (It appears, for example, that you don't need escape characters for periods or forward slashes.)

The solution that I came up with on 2/22/26 to the problem of:

> "How can I differentiate between being in an inbox (where you want to suppress Vimium's use of j and k and other keys) from when I'm in an email message?"

It appears that, when in a message, the URL will display an identifier that always seems to begin with "FMfcgz". So the first regex pattern identifies Gmail URLs that DON'T have this string:

> `^https://mail.google.com/mail/u/0/((?!FMfcg).)*$`

And the second identifies URLs that DO have this FMfcgz string (with at least 16 characters):

> `^https://mail.google.com/mail/u/0/.*([A-Za-z0-9_-]{16,})`

Any further attempts at refinement will need to go head-to-head with the exact requirements of the regex patterns.

Here are the URLs I experimented with to test out the regex on regex101.com:

| URL                                                                                                   | Inbox (1) or Message (0) |
|-------------------------------------------------------------------------------------------------------|---------------------------|
| [https://mail.google.com/mail/u/0/#inbox](https://mail.google.com/mail/u/0/#inbox)                    | 1                         |
| [https://mail.google.com/mail/u/0/#search/elise](https://mail.google.com/mail/u/0/#search/elise)      | 1                         |
| [https://mail.google.com/mail/u/0/#category/purchases](https://mail.google.com/mail/u/0/#category/purchases) | 1                         |
| [https://mail.google.com/mail/u/0/#search/category%3Apurchases+cheetah+house](https://mail.google.com/mail/u/0/#search/category%3Apurchases+cheetah+house) | 1                         |
| [https://mail.google.com/mail/u/0/#drafts](https://mail.google.com/mail/u/0/#drafts)                  | 1                         |
| [https://mail.google.com/mail/u/0/#inbox/FMfcgzQfBstJWbnVsqMLxcBZpqLFRRxF](https://mail.google.com/mail/u/0/#inbox/FMfcgzQfBstJWbnVsqMLxcBZpqLFRRxF) | 0                         |
| [https://mail.google.com/mail/u/0/#inbox/FMfcgzQfBQJFZHFPDrVvBvdSfqfqRBCQ](https://mail.google.com/mail/u/0/#inbox/FMfcgzQfBQJFZHFPDrVvBvdSfqfqRBCQ) | 0                         |
| [https://mail.google.com/mail/u/0/#search/elise/FMfcgzQfBZgpgnDGdNwqndSDxkWhbgrR](https://mail.google.com/mail/u/0/#search/elise/FMfcgzQfBZgpgnDGdNwqndSDxkWhbgrR) | 0                         |
| [https://mail.google.com/mail/u/0/#search/jess+started+a+substack/FMfcgzQfBZgpgnDGdNwqndSDxkWhbgrR](https://mail.google.com/mail/u/0/#search/jess+started+a+substack/FMfcgzQfBZgpgnDGdNwqndSDxkWhbgrR) | 0                         |
| [https://mail.google.com/mail/u/0/#search/category%3Apurchases+cheetah+house/FMfcgzQfBshlXdlXxpSdDVTGMKTBJsvW](https://mail.google.com/mail/u/0/#search/category%3Apurchases+cheetah+house/FMfcgzQfBshlXdlXxpSdDVTGMKTBJsvW) | 0                         |
| [https://mail.google.com/mail/u/0/#search/received+2022/FMfcgzGpGdmnvsBNMBGnwCkTrbjrQXGZ](https://mail.google.com/mail/u/0/#search/received+2022/FMfcgzGpGdmnvsBNMBGnwCkTrbjrQXGZ) | 0                         |
