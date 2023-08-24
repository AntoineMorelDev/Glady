import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Ajoutez ceci
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('searchCombination', () => {
    it('should make a GET request with default shopId', () => {
      const testAmount = 100;
      const testResponse = {};

      service.searchCombination(testAmount).subscribe(response => {
        expect(response).toEqual(testResponse);
      });

      const req = httpMock.expectOne(`${environment.baseUrl}/shop/${ApiService.DEFAULT_SHOP_ID}/search-combination?amount=${testAmount}`);
      expect(req.request.method).toBe('GET');
      req.flush(testResponse);
    });

    it('should make a GET request with provided shopId', () => {
      const testAmount = 100;
      const testShopId = 10;
      const testResponse = {}; 
      
      service.searchCombination(testAmount, testShopId).subscribe(response => {
        expect(response).toEqual(testResponse);
      });

      const req = httpMock.expectOne(`${environment.baseUrl}/shop/${testShopId}/search-combination?amount=${testAmount}`);
      expect(req.request.method).toBe('GET');
      req.flush(testResponse);
    });
  });
});
