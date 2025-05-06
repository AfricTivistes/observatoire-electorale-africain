from flask import Flask, jsonify
from bs4 import BeautifulSoup
from datetime import datetime
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time
import re

app = Flask(__name__)

KEYWORDS = ["élection présidentielle", "présidentielle", "élections présidentielles",
            "élection législative", "législative", "élections législatives"]

START_URL = "https://aps.sn/politique/"

def clean_text(text):
    if not text:
        return ""
    return re.sub(r'\s+', ' ', text).strip()

def fetch_election_articles():
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    driver = webdriver.Chrome(options=options)

    driver.get(START_URL)
    time.sleep(5)
    soup = BeautifulSoup(driver.page_source, "html.parser")
    article_links = soup.select("h6.p-ttl a.ttl-link") or soup.select("a.ttl-link")

    results = []

    for link in article_links[:50]:
        url = link.get("href")
        title = clean_text(link.text)

        try:
            driver.get(url)
            time.sleep(3)
            article_soup = BeautifulSoup(driver.page_source, "html.parser")

            # Récupération du contenu
            selectors = [
                "div.td-post-content", "div.elementor-widget-theme-post-content",
                "div.content-inner", "div.post-content", "article",
                "main .entry-content", ".post-content-wrap"
            ]
            content_tag = None
            for selector in selectors:
                content_tag = article_soup.select_one(selector)
                if content_tag and len(content_tag.text.strip()) > 100:
                    break
            content = clean_text(content_tag.text if content_tag else "")
            if not content:
                paragraphs = article_soup.select("p")
                content = "\n\n".join([p.text for p in paragraphs if len(p.text.strip()) > 50])

            if not content or len(content) < 100:
                continue

            combined_text = f"{title.lower()} {content.lower()}"
            if any(kw in combined_text for kw in KEYWORDS):
                description = content.split("\n")[0] if "\n" in content else content[:200]
                results.append({
                    "title": title,
                    "description": description,
                    "content": content,
                    "url": url
                })

        except Exception as e:
            print(f"Erreur pour {title}: {e}")

    driver.quit()
    return results

@app.route('/api/articles-aps', methods=['GET'])
def get_election_articles():
    articles = fetch_election_articles()
    return jsonify(articles)

if __name__ == '__main__':
    app.run(debug=True)
