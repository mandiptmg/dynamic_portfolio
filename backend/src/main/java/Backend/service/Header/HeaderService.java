package Backend.service.Header;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Backend.model.Header.Header;
import Backend.repository.header.HeaderRepository;

@Service
public class HeaderService {
    @Autowired
    private HeaderRepository headerRepository;

    public List<Header> getAllHeaders() {
        return headerRepository.findAll();
    }

    public Optional<Header> getHeaderById(Long id) {
        return headerRepository.findById(id);
    }

    public Header creatHeader(Header header) {
        Optional<Header> existingHeader = headerRepository.findByName(header.getName());
        if (existingHeader.isPresent()) {
            throw new RuntimeException(header.getName() + " already exists");
        }

        Header newHeader = new Header();
        newHeader.setName(header.getName());
        newHeader.setIcon(header.getIcon());
        newHeader.setLink(header.getLink());
        return headerRepository.save(newHeader);
    }

    public Header updateHeader(Long id, Header headerDetails) {
        return headerRepository.findById(id).map(header -> {
            header.setName(headerDetails.getName());
            header.setIcon(headerDetails.getIcon());
            header.setLink(headerDetails.getLink());
            return headerRepository.save(header);
        }).orElseThrow(() -> new RuntimeException("Header not found"));
    }

    public void deleteHeader(Long id) {
        headerRepository.deleteById(id);
    }

}
