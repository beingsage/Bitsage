import pandas as pd
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup

def scrape_noon():
    print("Starting scraping process...")
    
    # Enhanced Chrome options
    chrome_options = Options()
    chrome_options.add_argument('--headless=new')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    chrome_options.add_argument('--disable-gpu')
    chrome_options.add_argument('--window-size=1920,1080')
    chrome_options.add_argument('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
    
    driver = None
    try:
        print("Initializing WebDriver...")
        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
        
        url = "https://www.noon.com/uae-en/sports-and-outdoors/exercise-and-fitness/yoga-16328/"
        print(f"Accessing URL: {url}")
        
        driver.get(url)
        print("Page loaded successfully")
        
        # Wait for initial load
        time.sleep(5)
        
        # Scroll multiple times to ensure all content loads
        print("Starting scroll sequence...")
        scroll_attempts = 0
        max_attempts = 10
        
        while scroll_attempts < max_attempts:
            try:
                # Scroll down in smaller increments
                for i in range(5):
                    driver.execute_script(f"window.scrollTo(0, {i * 1000});")
                    time.sleep(1)
                
                # Try to find products after each scroll
                products = driver.find_elements(By.CSS_SELECTOR, 
                    "div[data-qa='product-block'], div.productContainer, div.product-card, div.loaderContainer")
                
                print(f"Found {len(products)} products after scroll attempt {scroll_attempts + 1}")
                
                if len(products) > 0:
                    break
                    
                scroll_attempts += 1
                time.sleep(2)
                
            except Exception as e:
                print(f"Scroll attempt {scroll_attempts + 1} failed: {e}")
                scroll_attempts += 1
        
        # Now try to extract product information
        print("Extracting product information...")
        products_data = []
        
        # Wait for products to be visible
        wait = WebDriverWait(driver, 10)
        try:
            products = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, 
                "div[data-qa='product-block'], div.productContainer, div.product-card")))
            
            print(f"Found {len(products)} products to process")
            
            for product in products:
                try:
                    # Wait for product details to be visible
                    name = product.find_element(By.CSS_SELECTOR, "div.name, h2, h3").text.strip()
                    price_element = product.find_element(By.CSS_SELECTOR, "span.amount, div.price")
                    price = float(price_element.text.replace('AED', '').strip())
                    
                    products_data.append({
                        "Name": name,
                        "Price": price,
                        "Brand": product.get_attribute('data-brand') or "Unknown",
                        "Seller": product.get_attribute('data-seller') or "Unknown"
                    })
                    print(f"Extracted: {name[:30]}... - AED {price}")
                    
                except Exception as e:
                    print(f"Error extracting product details: {e}")
                    continue
                    
        except Exception as e:
            print(f"Error waiting for products: {e}")
        
        if products_data:
            df = pd.DataFrame(products_data)
            print(f"\nSuccessfully scraped {len(df)} products")
            df.to_csv('noon_products.csv', index=False)
            return df
        else:
            print("No products found in the parsed content")
            with open('debug_page.html', 'w', encoding='utf-8') as f:
                f.write(driver.page_source)
            print("Saved page source to debug_page.html for inspection")
            return pd.DataFrame()
            
    except Exception as e:
        print(f"An error occurred: {e}")
        if driver:
            with open('error_page.html', 'w', encoding='utf-8') as f:
                f.write(driver.page_source)
            print("Saved error page to error_page.html for inspection")
        return pd.DataFrame()
        
    finally:
        if driver:
            driver.quit()
            print("Browser closed")

# Analyze the data
def analyze_data(df):
    # Check if DataFrame is empty first
    if df.empty:
        print("No data to analyze - DataFrame is empty")
        return
        
    try:
        # Most and least expensive products
        most_expensive = df.loc[df['Price'].idxmax()]
        cheapest = df.loc[df['Price'].idxmin()]
        
        # Count by brand and seller
        brand_count = df['Brand'].value_counts()
        seller_count = df['Seller'].value_counts()
        
        # Print analysis
        print("Most Expensive Product:", most_expensive.to_dict())
        print("Cheapest Product:", cheapest.to_dict())
        print("Number of Products by Brand:\n", brand_count)
        print("Number of Products by Seller:\n", seller_count)
        
        # Visualizations
        plt.figure(figsize=(10, 5))
        brand_count[:10].plot(kind='bar', title="Top 10 Brands by Product Count")
        plt.show()
        
        plt.figure(figsize=(10, 5))
        seller_count[:10].plot(kind='bar', title="Top 10 Sellers by Product Count", color='orange')
        plt.show()
    except Exception as e:
        print(f"Error during analysis: {e}")

# Main execution
if __name__ == "__main__":
    print("Starting script...")
    product_data = scrape_noon()
    
    if product_data.empty:
        print("No data was collected. Scraping failed.")
    else:
        print(f"\nFound {len(product_data)} products in total")
        analyze_data(product_data)

